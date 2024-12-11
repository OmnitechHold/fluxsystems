from flask import Blueprint, jsonify, request

bp = Blueprint('members', __name__, url_prefix='/api/members')

@bp.route('/', methods=['GET'])
def get_members():
    return jsonify({'message': 'Get all members'})

@bp.route('/<int:id>', methods=['GET'])
def get_member(id):
    return jsonify({'message': f'Get member {id}'})
