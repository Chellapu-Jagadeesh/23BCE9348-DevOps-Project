
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }
    environment {
        KUBECONFIG = ""C:\Program Files\Jenkins\.kube\config""
        DOCKER_IMAGE = 'tourism-website'
        DOCKER_TAG = 'v2'
        K8S_NAMESPACE = 'default'
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo '📥 Pulling code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/Chellapu-Jagadeesh/23BCE9348-DevOps-Project.git'
                echo '✅ Code pulled successfully'
            }
        }

        stage('Verify Tools') {
            steps {
                echo '🔍 Checking installed tools...'
                bat '''
                    node --version
                    npm --version
                    docker --version
                    kubectl version --client
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                bat '''
                    if exist package.json (
                        npm install
                    ) else (
                        echo No package.json found. Skipping npm install.
                    )
                '''
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running basic checks...'
                bat '''
                    if not exist server.js (
                        echo ERROR: server.js not found
                        exit /b 1
                    )

                    if not exist index.html (
                        echo ERROR: index.html not found
                        exit /b 1
                    )

                    findstr /C:"/health" server.js
                    if errorlevel 1 (
                        echo ERROR: Health endpoint not found
                        exit /b 1
                    )

                    echo All basic checks passed.
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                bat '''
                    docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .

                    if errorlevel 1 exit /b 1

                    echo Docker image built successfully.
                '''
            }
        }

        stage('Verify Docker Image') {
            steps {
                echo '📋 Verifying Docker image...'
                bat '''
                    docker images | findstr %DOCKER_IMAGE%

                    if errorlevel 1 (
                        echo Docker image not found
                        exit /b 1
                    )
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '☸️ Deploying application...'
                bat '''
                    kubectl apply -f k8s\\deployment.yaml
                    if errorlevel 1 exit /b 1

                    kubectl apply -f k8s\\service.yaml
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Verify Kubernetes Deployment') {
            steps {
                echo '🔍 Verifying deployment...'
                bat '''
                    kubectl rollout status deployment/tourism-website --timeout=60s

                    kubectl get deployments

                    kubectl get pods

                    kubectl get svc tourism-website-service
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                echo '🔥 Running smoke test...'
                bat '''
                    timeout /t 10 /nobreak

                    curl http://localhost:30081/health

                    if errorlevel 1 (
                        echo Smoke test failed.
                        exit /b 1
                    )

                    echo Smoke test passed.
                '''
            }
        }
    }

    post {

        always {
            echo '🏁 Pipeline finished.'
            cleanWs()
        }

        success {
            echo '🎉 BUILD SUCCESSFUL — Application deployed successfully!'
        }

        failure {
            echo '❌ BUILD FAILED — Check the console output.'
        }
    }
}

