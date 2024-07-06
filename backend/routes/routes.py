from flask import Blueprint, jsonify
from queries.queries import get_all_assets, get_loan_history, get_household_income

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
    return jsonify({'household_income': income})
