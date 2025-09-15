pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "myflaskapi:latest"
        CONTAINER_NAME = "flaskapi-container"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/myapp.git'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm $DOCKER_IMAGE pytest'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker rm -f $CONTAINER_NAME || true'
                sh 'docker run -d --name $CONTAINER_NAME -p 5000:5000 $DOCKER_IMAGE'
            }
        }
    }
    post {
        success {
            echo "🚀 App deployed at http://localhost:5000"
        }
        failure {
            echo "❌ Build/Test/Deploy failed"
        }
    }
}