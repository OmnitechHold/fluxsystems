from flask import Blueprint, jsonify, request

bp = Blueprint('till', __name__, url_prefix='/api/till')

@bp.route('/sessions', methods=['GET'])
def get_sessions():
    return jsonify({'message': 'Get all till sessions'})

@bp.route('/sessions/<int:id>', methods=['GET'])
def get_session(id):
    return jsonify({'message': f'Get till session {id}'})
