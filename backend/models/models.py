from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=True)
    spouse_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=True)
    dob = db.Column(db.DateTime, nullable=True)
    city_id = db.Column(db.Integer, db.ForeignKey('city.city_id'), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'), nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.job_id'), nullable=True)
    income = db.Column(db.Float, nullable=True)
    
    spouse = relationship("Users", remote_side=[user_id])
    city = relationship("City", back_populates="users")
    company = relationship("Company", back_populates="users")
    job = relationship("Job", back_populates="users")
    loans = relationship("Loans", back_populates="user")
    assets = relationship("AssetToOwner", back_populates="user")

class City(db.Model):
    __tablename__ = 'city'
    city_id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String, nullable=False)
    state_name = db.Column(db.String, nullable=True)
    population = db.Column(db.Integer, nullable=True)
    avg_income = db.Column(db.Float, nullable=True)
    
    users = relationship("Users", back_populates="city")

class Company(db.Model):
    __tablename__ = 'company'
    company_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String, nullable=False)
    num_employees = db.Column(db.Integer, nullable=True)
    
    users = relationship("Users", back_populates="company")

class Job(db.Model):
    __tablename__ = 'job'
    job_id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String, nullable=False)
    avg_income = db.Column(db.Integer, nullable=True)
    
    users = relationship("Users", back_populates="job")

class Loans(db.Model):
    __tablename__ = 'loans'
    loan_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    reason = db.Column(db.String, nullable=True)
    loan_amount = db.Column(db.Float, nullable=False)
    balance_paid = db.Column(db.Float, nullable=True)
    date_created = db.Column(db.DateTime, nullable=False)
    
    user = relationship("Users", back_populates="loans")

class AssetToOwner(db.Model):
    __tablename__ = 'asset_to_owner'
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.asset_id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    
    user = relationship("Users", back_populates="assets")
    asset = relationship("Assets", back_populates="owners")

class Assets(db.Model):
    __tablename__ = 'assets'
    asset_id = db.Column(db.Integer, primary_key=True)
    asset_type = db.Column(db.String, nullable=False)
    worth = db.Column(db.Float, nullable=False)
    
    owners = relationship("AssetToOwner", back_populates="asset")

class Dependant(db.Model):
    __tablename__ = 'dependant'
    provider_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    dependant_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), primary_key=True)
    
    provider = relationship("Users", foreign_keys=[provider_id])
    dependant = relationship("Users", foreign_keys=[dependant_id])
