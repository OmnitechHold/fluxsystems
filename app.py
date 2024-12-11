from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flux.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import routes after db initialization to avoid circular imports
from routes import member_routes, claims_routes, financial_routes, till_routes

# Register blueprints
app.register_blueprint(member_routes.bp)
app.register_blueprint(claims_routes.bp)
app.register_blueprint(financial_routes.bp)
app.register_blueprint(till_routes.bp)

@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
