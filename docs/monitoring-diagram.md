# Monitoring Data Flow Diagram

```mermaid
flowchart LR
  A[Users/Clients] --> B[Node App\n/src/server.js]
  B -->|/metrics| C[Prometheus]
  C --> D[Grafana]
  D --> E[Dashboards/Reports]
```

Explanation:
- The Node app exposes `/metrics`.
- Prometheus scrapes those metrics on a schedule.
- Grafana reads from Prometheus and shows charts.
- Reports are created from the dashboards.
