from flask import Blueprint, jsonify, request
from queries.queries import get_all_assets, get_loan_history, get_household_income,pay_loan, new_loan, get_user_household_member, register_user, search_by_name

api_bp = Blueprint('api', __name__)

@api_bp.route('/total-assets/<int:user_id>', methods=['GET'])
def total_assets(user_id):
    assets = get_all_assets(user_id)
    return jsonify(assets)

@api_bp.route('/loan-history/<int:user_id>', methods=['GET'])
def loan_history(user_id):
    loans = get_loan_history(user_id)
    return jsonify(loans)

@api_bp.route('/household-income/<int:user_id>', methods=['GET'])
def household_income(user_id):
    income = get_household_income(user_id)
    return jsonify(income)

@api_bp.route('/register-user/', methods=['POST'])
def register_new_user():
    data = request.json  # Get the JSON data sent with the POST request
    name = data.get('name')
    address = data.get('address')
    dob = data.get('dob')
    city_name = data.get('city_name')
    company_name = data.get('company_name')
    job_title = data.get('job_title')
    income = data.get('income')
    try:
        register_user(name, address, dob, city_name, company_name, job_title, income)
        response = "success."
        return response, 200
    except Exception as e:
        response = "error."
        print(e)
        return response, 500

@api_bp.route('/get-user-household-member/<int:user_id>', methods=['GET'])
def user_household_member(user_id):
    members = get_user_household_member(user_id)
    return jsonify(members)

@api_bp.route('/pay-loan/', methods=['PUT'])
def loan_payment():
    data = request.json  # Get the JSON data sent with the POST request
    loan_id = data.get('loan_id')
    amount = data.get('amount')
    try:
        pay_loan(loan_id, amount)
        response = "success."
        return response, 200
    except Exception as e:
        print(e)
        response = "error."
        return response, 500

@api_bp.route('/new-loan/', methods=['POST'])
def create_loan():
    data = request.json  # Get the JSON data sent with the POST request
    user_id = data.get('user_id')
    loan_reason = data.get('loan_reason')
    loan_amount = data.get('loan_amount')
    balance_paid = data.get('balance_paid')
    date_created = data.get('date_created')
    try:
        new_loan(user_id, loan_reason, loan_amount, balance_paid, date_created)
        response = "success."
        return response, 200
    except Exception as e:
        print(e)
        response = "error."
        return response, 500

@api_bp.route('/search/<string:name>', methods=['GET'])
def search_user_by_name(name):
    users = search_by_name(name)
    return jsonify(users)

@api_bp.route('/loan-approval', methods=['POST'])
def loan_approval():
    data = request.json
    user_id = data.get('user_id')
    loan_amount = data.get('loan_amount')
    # temp return
    return "0.37", 200

