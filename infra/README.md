# Infrastructure Overview

This folder documents the AWS deployment strategy for the FinTrack real-time financial dashboard.

## AWS ECS Deployment

- **Containerization**: Both the frontend and backend ship as container images built from the repository root. Each image is published to Amazon Elastic Container Registry (ECR).
- **Cluster**: A Fargate-based ECS cluster hosts the services. The backend service exposes port `4000` and the frontend service serves static assets through port `80` via an Application Load Balancer (ALB).
- **Auto Scaling**: Target-tracking scaling policies keep CPU utilization below 60% and maintain headroom for 500+ concurrent WebSocket sessions. CloudWatch alarms trigger scale-out events when average memory or CPU surpass thresholds for two consecutive periods.
- **Networking**: Services run in private subnets with outbound internet access through a NAT gateway. The ALB resides in public subnets and terminates HTTPS connections using ACM certificates.

## CI/CD Workflow

A GitHub Actions workflow builds and pushes Docker images on every main-branch merge and updates the ECS services via the AWS Copilot CLI or the AWS CLI with CodeDeploy blue/green deployments. The workflow also runs the shared Jest test suite with code coverage gates at 80% to ensure regression detection before deployment.
