from flask import Blueprint, jsonify, request

bp = Blueprint('claims', __name__, url_prefix='/api/claims')

@bp.route('/', methods=['GET'])
def get_claims():
    return jsonify({'message': 'Get all claims'})

@bp.route('/<int:id>', methods=['GET'])
def get_claim(id):
    return jsonify({'message': f'Get claim {id}'})
