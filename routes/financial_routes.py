from flask import Blueprint, jsonify, request

bp = Blueprint('financial', __name__, url_prefix='/api/financial')

@bp.route('/transactions', methods=['GET'])
def get_transactions():
    return jsonify({'message': 'Get all transactions'})

@bp.route('/transactions/<int:id>', methods=['GET'])
def get_transaction(id):
    return jsonify({'message': f'Get transaction {id}'})
