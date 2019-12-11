pipeline {
    agent any

    stages {
        stage('Testing FAQS Backend Express') {
            steps {
		    echo "Testing"
            }
        }
        stage('Building FAQS Backend Express') {
            steps {
            sh 'cp -f ~/config/config.js ./config.js'
            sh 'cp -f ~/config/config.json ./config.json'
		    sh 'docker build -t="rakimsv/faqs-backend-express:latest" .'
            }
        }
        stage('Staging FAQS Backend Express') {
            steps {
                   echo "Staging"
            }
        }
        stage('Deploying FAQS Backend Express') {
            steps {
		   sh 'docker push "rakimsv/faqs-backend-express:latest"'
                   echo "Deploying"
            }
        }
        stage('FAQS Backend Express deployed') {
            steps {
                echo "Project Deployed"
            }
        }
        stage('Running FAQS Backend Express') {
            steps {
                sh 'docker run "rakimsv/faqs-backend-express:latest"'
                echo "Project Running"
            }
        }
    }
}
