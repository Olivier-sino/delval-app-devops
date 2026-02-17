# DELVEL LTD DevOps Demo

This repository shows a simple DevOps setup for a Node.js service:
- Containerization with Docker and Docker Compose
- Monitoring with Prometheus + Grafana
- CI pipeline for build/test (GitHub Actions)

## Prerequisites
- Docker and Docker Compose
- Node.js (only needed for local non-Docker runs)

## Project Structure
- `src/server.js`: Node.js app with `/metrics`
- `docker/Dockerfile`: Container build for the app
- `docker-compose.yml`: Runs app + monitoring stack
- `monitoring/prometheus.yml`: Prometheus scrape config
- `monitoring/grafana/`: Grafana provisioning + dashboard JSON
- `docs/monitoring.md`: Monitoring usage and report template
- `docs/monitoring-report.md`: One-page report template
- `docs/monitoring-diagram.md`: Data flow diagram
- `docs/devops-cheatsheet.md`: Command + junior/senior summary
- `.github/ci.yml`: CI pipeline definition

## Run Locally (Docker)
```bash
docker compose up --build
```

Services:
- App: `http://localhost:3000`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001` (login `admin` / `admin`)

Grafana will auto-load the dashboard named **DELVEL App Overview**.

Stop:
```bash
docker compose down
```

## Metrics Check
```bash
curl http://localhost:3000/metrics
```

If this returns metrics text, Prometheus should show the target as **UP**:
- Prometheus UI → Status → Targets

## CI Pipeline (GitHub Actions)
The CI pipeline is defined in `.github/ci.yml` and runs on every push.
Steps:
1. Checkout code
2. Setup Node.js 18
3. Install pnpm
4. Install dependencies
5. Run tests (`pnpm test`)

To use CI:
- Push this repo to GitHub
- Ensure GitHub Actions is enabled

## How This Meets the Tasks
### Containerization
- Dockerfile + Docker Compose run the app and monitoring tools in containers.

### Monitoring
- `prom-client` exposes `/metrics`
- Prometheus scrapes metrics every 15s
- Grafana visualizes the metrics
- `docs/monitoring.md` shows how to analyze and report

## Troubleshooting
- First Docker build can be slow because it downloads the Node image.
- If Prometheus target is DOWN, confirm `http://localhost:3000/metrics` works.
- If Grafana login fails, restart containers and retry `admin/admin`.

## Notes
This is a learning-friendly setup. It can be extended later with:
- Database container
- Alerts (email/Slack)
- Deployment to cloud and auto-scaling
