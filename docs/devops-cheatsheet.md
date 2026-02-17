# DevOps Cheat Sheet (Docker + Monitoring + CI/CD)

## Core Commands (Remember) + Simple Explanation
Docker basics:
- `docker build -t app:latest .` — build an image from the Dockerfile in the current folder.
- `docker run -p 3000:3000 app:latest` — run the image and map port 3000 to your machine.
- `docker compose up --build` — build and start all services from `docker-compose.yml`.
- `docker compose up -d` — start services in the background.
- `docker compose down` — stop and remove services.
- `docker ps` — list running containers.
- `docker logs <container>` — show logs for a container.
- `docker exec -it <container> sh` — open a shell inside a running container.
- `docker images` — list local images.
- `docker pull <image>` — download an image from a registry.
- `docker push <image>` — upload an image to a registry.

Monitoring checks:
- `curl http://localhost:3000/metrics` — confirm your app is exposing metrics.
- Prometheus UI → Status → Targets — check that Prometheus can reach the app (status **UP**).
- Grafana UI → Open dashboard — view charts and analyze performance.

CI/CD essentials:
- `git status` — check what changed.
- `git add .` — stage changes for commit.
- `git commit -m "message"` — save a snapshot of changes.
- `git push` — upload commits to remote (triggers CI).

## Junior vs Senior (Quick Comparison)
Junior:
- Runs commands without purpose
- Fixes issues after they happen
- Manual steps are common
- Monitoring is “optional”

Senior:
- Understands why each tool exists
- Automates steps (CI/CD)
- Designs for reliability (health checks, restarts)
- Monitors and alerts proactively
- Documents everything for the team

## Minimal Deployment Flow
1. Build image
2. Run containers with Compose
3. Verify app and metrics
4. Check Prometheus targets
5. View Grafana dashboard
6. Write a short monitoring report
