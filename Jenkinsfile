pipeline {
  agent {
    node {
      label 'ts-backend-01'
    }

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

    stage('Run Newman Tests') {
      steps {
        sh 'newman run server/postmanCollections/GambareVol2.postman_collection.json'
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
  tools {
    nodejs 'NodeJS-Newman'
  }
}