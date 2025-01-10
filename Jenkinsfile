pipeline {
  agent {
    node {
      label 'ts-backend-01'
    }
  }
  tools {
    nodejs 'NodeJS-Newman'
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
    stage('Compile TypeScript') {
      steps {
        sh 'npx tsc'
      }
    }
    stage('Run Newman Tests') {
      steps {
        sh 'npx newman run server/postmanCollections/GambareVol2.postman_collection.json -r junit --reporter-export newman/test-results.xml'
      }
    }
    stage('Publish Test Results') {
      steps {
        junit 'newman/test-results.xml'
      }
    }
    stage('Run Prisma Migrations') {
      steps {
        sh 'npx prisma migrate deploy'
      }
    }
    stage('Start Server') {
      steps {
        sh 'npm rm dist && npm run build && node dist/index.js'
      }
    }
  }
  post {
    always {
      echo 'Pipeline completed!'
    }
  }
}
