# DELVEL LTD DevOps Project

This project demonstrates a practical DevOps workflow for a Node.js service using:
- Docker containerization
- Docker Compose orchestration
- Prometheus and Grafana monitoring
- GitHub Actions CI pipeline

## 1. Architecture

Services started by `docker compose`:
- `web`: Node.js application (`src/server.js`)
- `prometheus`: collects metrics from `web`
- `grafana`: visualizes Prometheus metrics

Monitoring data flow:
1. App exposes metrics at `/metrics`
2. Prometheus scrapes `web:3000/metrics` every 15s
3. Grafana reads Prometheus and shows dashboards

## 2. Repository Layout

- `src/server.js`: app server and metrics endpoint
- `docker/Dockerfile`: app image build
- `docker-compose.yml`: multi-container runtime
- `monitoring/prometheus.yml`: Prometheus scrape config
- `monitoring/grafana/`: Grafana datasource + dashboard provisioning
- `.github/workflows/ci.yml`: GitHub Actions CI workflow
- `docs/monitoring.md`: monitoring usage notes
- `docs/monitoring-report.md`: one-page report template
- `docs/monitoring-diagram.md`: data-flow diagram
- `docs/devops-cheatsheet.md`: key commands and explanations

## 3. Prerequisites

Required:
- Docker Engine + Docker Compose plugin
- Git

Optional (for local non-container run):
- Node.js 18+
- pnpm

## 4. Run the Full Stack

Start all services:
```bash
docker compose up --build
```

Run in background:
```bash
docker compose up -d --build
```

Stop services:
```bash
docker compose down
```

Endpoints:
- App: `http://localhost:3000`
- Metrics endpoint: `http://localhost:3000/metrics`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001` (login: `admin` / `admin`)

## 5. Verify Monitoring Works

1. Check app metrics endpoint:
```bash
curl http://localhost:3000/metrics
```

2. Check Prometheus target:
- Open Prometheus UI
- Go to `Status -> Targets`
- Confirm `delvel-app` target is `UP`

3. Check Grafana dashboard:
- Open Grafana UI
- Dashboard `DELVEL App Overview` should be available automatically

## 6. CI/CD Setup on GitHub

Current state:
- CI is implemented in `.github/workflows/ci.yml`
- Workflow runs on `push`
- It installs dependencies and runs tests (`pnpm test`)

Workflow steps:
1. Checkout repository
2. Setup Node.js 18
3. Install pnpm
4. Install project dependencies
5. Run tests

To enable CI in your GitHub repo:
1. Push this project to GitHub
2. Open `Settings -> Actions -> General`
3. Ensure GitHub Actions is allowed
4. Push a commit and check the `Actions` tab

CD status:
- Full automatic deployment is not yet defined in workflow
- Current project includes CI and local container deployment via Docker Compose

## 7. Typical Developer Workflow

1. Develop feature locally
2. Run tests locally (optional for quick check):
```bash
pnpm test
```
3. Build and run containers:
```bash
docker compose up --build
```
4. Verify app + metrics + dashboard
5. Commit and push changes
6. GitHub Actions CI validates the push

## 8. Troubleshooting

`TLS handshake timeout` when pulling images:
- Cause: network instability while contacting Docker Hub
- Fix:
```bash
docker pull prom/prometheus:latest
docker pull grafana/grafana:latest
```
Then retry:
```bash
docker compose up --build
```

Slow first build:
- First build downloads base images; later builds are faster due to cache

Prometheus target is DOWN:
- Confirm app is running
- Confirm `http://localhost:3000/metrics` returns metrics

Grafana login issue:
- Use `admin/admin`
- Restart stack if needed:
```bash
docker compose down
docker compose up -d --build
```

## 9. What This Project Demonstrates

- Containerized application delivery with Docker
- Multi-service orchestration with Docker Compose
- Practical monitoring strategy (collect, visualize, analyze, report)
- CI automation with GitHub Actions

