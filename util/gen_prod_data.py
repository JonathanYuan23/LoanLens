import pandas as pd
import numpy as np
from faker import Faker
from datetime import date
import random
import json


# initialize Faker
fake = Faker('en_US')

exchange_rate_INR_to_USD = 0.012

def get_users_df():
    # load dataset
    with open('../dataset/loan_approval_dataset.json', 'r') as file:
        data = json.load(file)

    df = pd.DataFrame(data)
    df.drop(["Id", "CITY", "STATE", "CURRENT_JOB_YRS", "CURRENT_HOUSE_YRS"], axis=1, inplace=True)
    sampled_df = df.sample(n = 50000)
    sampled_df = sampled_df.reset_index(drop=True)

    return sampled_df


def get_loan_reasons():
    # load loan reasons
    with open('./loan_reasons.txt', 'r') as file:
        loan_reasons = [reason.strip() for reason in file.readlines()]

    return loan_reasons


def generate_cities():
    # generate city data from us cities dataset
    city_df = pd.read_csv('../dataset/uscities.csv')

    city_df.rename(columns={'city': 'city_name'}, inplace=True)
    city_df.drop(["city_ascii", "state_id", "county_fips", "county_name", "lat", "lng", "density", "source", "military", "incorporated", "timezone", "ranking", "zips", "id"], axis=1, inplace=True)
    city_df = city_df[city_df['population'] >= 50000]

    city_df['city_id'] = range(1, len(city_df) + 1)
    city_df['avg_income'] = np.random.randint(45000, 90000, size=len(city_df))

    city_df = city_df[['city_id', 'city_name', 'state_name', 'population', 'avg_income']]

    city_df.to_csv('prod_data/cities.csv', index=False)

    return city_df


def generate_jobs(df):
    job_data = []

    # extract data for Job table
    professions = df['Profession'].unique()
    profession_to_id = {profession: idx + 1 for idx, profession in enumerate(professions)}
    profession_average_income = df.groupby('Profession')['Income'].mean().astype(int).to_dict()

    # INR to USD conversion rate
    profession_average_income = {profession: int(income * exchange_rate_INR_to_USD) for profession, income in profession_average_income.items()}

    for profession, job_id in profession_to_id.items():
        avg_income = profession_average_income[profession]
        job_data.append([job_id, profession, avg_income])

    job_df = pd.DataFrame(job_data, columns=['job_id', 'job_title', 'avg_income'])
    job_df.to_csv('prod_data/jobs.csv', index=False)

    return job_df


def generate_companies():
    company_data = []

    # generate fake company data
    for i in range(10000):
        company_data.append([i + 1, fake.company(), random.randint(1, 300000)])

    company_df = pd.DataFrame(company_data, columns=['company_id', 'company_name', 'num_employees'])
    company_df.to_csv('prod_data/companies.csv', index=False)

    return company_df


def generate_users(df, city_df, company_df, job_df):
    user_data = []

    user_assets = []
    user_spouses = []
    user_loans = []

    # extract data for Users table
    for user in df.itertuples():
        user_id = getattr(user, 'Index') + 1
        name = fake.name()
        address = fake.street_address()

        start_date = date(2024 - user.Age, 1, 1)
        end_date = date(2024 - user.Age, 12, 31)
        dob = fake.date_between(start_date=start_date, end_date=end_date)

        city_id = random.randint(0, len(city_df))
        company_id = random.randint(0, len(company_df))
        job_id = random.randint(0, len(job_df))
        income = int(getattr(user, 'Income') * exchange_rate_INR_to_USD)

        user_data.append([user_id, name, address, dob, city_id, company_id, job_id, income])

        if getattr(user, 'House_Ownership') == 'owned':
            user_assets.append((user_id, 'house'))

        if getattr(user, 'Car_Ownership') == 'yes':
            user_assets.append((user_id, 'car'))

        if getattr(user, '_4') == 'married':
            user_spouses.append(user_id)

        if getattr(user, 'Risk_Flag') == 0:
            if random.random() <= 0.3:
                user_loans.append(user_id)

    user_df = pd.DataFrame(user_data, columns=['user_id', 'name', 'address', 'dob', 'city_id', 'company_id', 'job_id', 'income'])
    user_df.to_csv('prod_data/users.csv', index=False)

    return user_df, user_assets, user_loans, user_spouses


def generate_assets(user_assets):
    asset_data = []
    asset_to_owner_data = []

    # generate assets data
    for i, (user_id, asset_type) in enumerate(user_assets):
        if asset_type == 'house':
            asset_data.append([i + 1, asset_type, random.randint(100000, 1500000)])
        elif asset_type == 'car':
            asset_data.append([i + 1, asset_type, random.randint(10000, 100000)])

        asset_to_owner_data.append([i + 1, user_id])

    asset_df = pd.DataFrame(asset_data, columns=['asset_id', 'asset_type', 'worth'])
    asset_to_owner_df = pd.DataFrame(asset_to_owner_data, columns=['asset_id', 'user_id'])

    asset_df.to_csv('prod_data/assets.csv', index=False)
    asset_to_owner_df.to_csv('prod_data/asset_to_owner.csv', index=False)

    return asset_df, asset_to_owner_df


def generate_loans(user_loans, loan_reasons):
    loan_data = []

    # generate loan data
    for i, user_id in enumerate(user_loans):
        j = random.randint(1, 3)
        for _ in range(j):
            reason = loan_reasons[random.randint(0, len(loan_reasons) - 1)]
            loan_amount = random.randint(1000, 200000)
            balance_paid = random.randint(0, loan_amount)
            start_date = date(2010, 1, 1)
            end_date = date.today()
            date_created = fake.date_between(start_date=start_date, end_date=end_date)

            loan_data.append([i + 1, user_id, reason, loan_amount, balance_paid, date_created])

    loan_df = pd.DataFrame(loan_data, columns=['loan_id', 'user_id', 'reason', 'loan_amount', 'balance_paid', 'date_created'])
    loan_df.to_csv('prod_data/loans.csv', index=False)

    return loan_df


def generate_dependants(df):
    dependant_data = []
    i = 1
    while i <= len(df):
        j = min(i + random.randint(1, 5), len(df))
        if i == j:
            break
        for k in range(i + 1, j + 1):
            dependant_data.append([i, k])
        i = j + 1

    dependant_df = pd.DataFrame(dependant_data, columns=['provider_id', 'dependant_id'])
    dependant_df.to_csv('prod_data/dependants.csv', index=False)

    return dependant_df

def generate_spouses(user_spouses):
    spouse_data = []
    i = 0
    while i < len(user_spouses):
        j = min(i + random.randint(1, 10), len(user_spouses) - 1)
        if i == j:
            break
        spouse_data.append([i, j])
        i = j + 1

    spouse_df = pd.DataFrame(spouse_data, columns=['spouse_id_1', 'spouse_id_2'])
    spouse_df.to_csv('prod_data/married.csv', index=False)

    return spouse_df

if __name__ == "__main__":
    loan_reasons = get_loan_reasons()

    df = get_users_df()
    job_df = generate_jobs(df)

    city_df = generate_cities()
    company_df = generate_companies()

    user_df, user_assets, user_loans, user_spouses = generate_users(df, city_df, company_df, job_df)

    asset_df, asset_to_owner_df = generate_assets(user_assets)
    loan_df = generate_loans(user_loans, loan_reasons)

    dependant_df = generate_dependants(df)

    spouse_df = generate_spouses(user_spouses)