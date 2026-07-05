pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    environment {
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
                sh '''
                    node --version
                    npm --version
                    docker --version
                    kubectl version --client
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 No npm dependencies for this static site'
                echo '✅ Skipping npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Testing health endpoint structure...'
                sh '''
                    echo "Checking server.js exists..."
                    test -f server.js && echo "✅ server.js found"

                    echo "Checking health endpoint in server.js..."
                    grep -q "/health" server.js && echo "✅ Health endpoint configured"

                    echo "Checking index.html exists..."
                    test -f index.html && echo "✅ index.html found"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh '''
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    echo "✅ Docker image built: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                '''
            }
        }

        stage('Verify Docker Image') {
            steps {
                echo '📋 Verifying Docker image...'
                sh '''
                    docker images | grep ${DOCKER_IMAGE}
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '☸️ Deploying to Kubernetes...'
                sh '''
                    # Update deployment with new image tag
                    kubectl set image deployment/tourism-website \
                        tourism-website=${DOCKER_IMAGE}:${DOCKER_TAG} \
                        --namespace=${K8S_NAMESPACE} \
                        || kubectl apply -f k8s/deployment.yaml

                    # Apply service
                    kubectl apply -f k8s/service.yaml

                    echo "✅ Kubernetes manifests applied"
                '''
            }
        }

        stage('Verify Kubernetes Deployment') {
            steps {
                echo '🔍 Verifying deployment...'
                sh '''
                    echo "--- Deployment Status ---"
                    kubectl rollout status deployment/tourism-website --timeout=60s

                    echo ""
                    echo "--- Pods ---"
                    kubectl get pods -l app=tourism-website

                    echo ""
                    echo "--- Services ---"
                    kubectl get svc tourism-website-service
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                echo '🔥 Running smoke tests...'
                sh '''
                    echo "Waiting 5 seconds for pods to stabilize..."
                    sleep 5

                    echo "Testing health endpoint via NodePort..."
                    curl -s http://localhost:30081/health || echo "⚠️ NodePort test failed (expected if not on same host)"

                    echo ""
                    echo "Testing via port-forward..."
                    kubectl port-forward deployment/tourism-website 8081:8081 &
                    PORT_FORWARD_PID=$!
                    sleep 3
                    HEALTH_RESPONSE=$(curl -s http://localhost:8081/health)
                    echo "Health Response: ${HEALTH_RESPONSE}"

                    if echo "${HEALTH_RESPONSE}" | grep -q "UP"; then
                        echo "✅ Application is healthy!"
                    else
                        echo "❌ Health check failed"
                        exit 1
                    fi

                    kill $PORT_FORWARD_PID 2>/dev/null || true
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
            echo '🎉 BUILD SUCCESSFUL — Application deployed to Kubernetes!'
        }
        failure {
            echo '❌ BUILD FAILED — Check console output above for errors'
        }
    }
}