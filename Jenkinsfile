pipeline {
  agent {
    docker {
      image 'node:14'
      args '-p 3000:3000'
    }
  }
  
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Deploy') {
      steps {
        sh 'npm run deploy'
      }
    }
  }
}