pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    
    stage('Deploy') {
      environment {
        // Set your deployment environment variables here
      }
      steps {
        sh 'npm run build'
        sh 'npm run deploy'
      }
    }
  }
}