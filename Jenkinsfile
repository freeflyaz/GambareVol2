pipeline {
    agent {label 'ts-backend-01'}
    environment {
        NODE_ENV = 'production'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://git@github.com:Anloms/GambareVol2.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Prisma Migrations') {
            steps {
                sh 'npx prisma migrate deploy'
            }
        }
        stage('Start Server') {
            steps {
                sh 'node index.js'
            }
        }
    }
}
