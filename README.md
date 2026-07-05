# 🌏 Explore India - Tourism Information Website

![DevOps Pipeline](https://img.shields.io/badge/DevOps-CI%2FCD-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-green)
![Jenkins](https://img.shields.io/badge/Jenkins-Automated-red)
![Monitoring](https://img.shields.io/badge/Monitoring-Nagios%20%7C%20Graphite%20%7C%20Grafana-orange)

## 📋 Project Overview
A state tourism department website showcasing tourist attractions, hotels, travel guides, maps, and booking links. Built with a complete DevOps pipeline for automated deployment, scalable hosting, and continuous monitoring.

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Server | Node.js (for health checks) |
| Container | Docker |
| Orchestration | Kubernetes |
| CI/CD | Jenkins |
| Monitoring | Nagios, Graphite, Grafana |
| Version Control | Git & GitHub |

## 🏗️ Architecture
User → NodePort Service → K8s Pod (Docker Container) → Tourism Website
↓
Monitoring Stack (Nagios + Graphite + Grafana)

## 🚀 Quick Start
```bash
# Clone repo
git clone https://github.com/Chellapu-Jagadeesh/23BCE9348-DevOps-Project.git

# Run with Docker
docker build -t tourism-website:v1 .
docker run -d -p 8081:8081 --name tourism tourism-website:v1

# Access at http://localhost:8081
```
📁 Project Structure
text

├── index.html         
├── css/style.css    
├── js/script.js       
├── server.js          
├── Dockerfile        
├── Jenkinsfile      
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
└── README.md

🔄 CI/CD Pipeline

    GitHub - Source code management

    Jenkins - Automated build & deploy

    Docker - Container build

    Kubernetes - Deployment orchestration

    Monitoring - Nagios + Graphite + Grafana

📊 Monitoring Setup

    Nagios - Host & service availability

    Graphite - Metrics collection

    Grafana - Dashboard visualization

⭐ Star this repo if you find it helpful!
text


---

