# AWS Deployment Guide for Khayelihle System

## Prerequisites
1. Install AWS CLI
2. Install EB CLI
3. AWS Account with appropriate permissions

## Backend Deployment (Elastic Beanstalk)

1. Initialize EB CLI in your project directory:
```bash
eb init -p python-3.8 khayelihle-system
```

2. Create an Elastic Beanstalk environment:
```bash
eb create khayelihle-system-prod
```

3. Deploy your application:
```bash
eb deploy
```

## Frontend Deployment (S3 + CloudFront)

1. Build your React application:
```bash
cd frontend
npm run build
```

2. Create an S3 bucket:
- Go to AWS Console > S3
- Create a new bucket named "khayelihle-system-frontend"
- Enable static website hosting
- Make the bucket public

3. Upload build files:
```bash
aws s3 sync build/ s3://khayelihle-system-frontend
```

4. Create CloudFront Distribution:
- Go to AWS Console > CloudFront
- Create distribution
- Origin domain: Select your S3 bucket
- Enable HTTPS

## Environment Variables
Set these in Elastic Beanstalk environment:
- FLASK_ENV=production
- Add any other environment-specific variables

## Database Migration (if applicable)
1. SSH into your EB instance:
```bash
eb ssh
```

2. Run migrations:
```bash
python manage.py db upgrade
```

## Monitoring
- Monitor your application through AWS CloudWatch
- Set up alarms for important metrics
- Check EB logs using `eb logs`

## Important Notes
1. Update CORS settings in your Flask application to allow requests from your CloudFront domain
2. Ensure all sensitive information is stored in environment variables
3. Set up proper security groups and IAM roles
4. Consider setting up CI/CD pipelines using AWS CodePipeline
