# Monitoring Guide (DELVAL LTD)

This guide implements tasks 2.1–2.5 using Prometheus + Grafana.

## What we measure
- Default Node.js process metrics (CPU, memory, event loop, GC)
- HTTP request duration (custom histogram)

## 2.2 Monitoring tools are configured
We use:
- `prom-client` in the app to expose `/metrics`
- Prometheus to scrape metrics
- Grafana to visualize

## How to run (local)
```bash
docker compose up --build
```

Open:
- App: `http://localhost:3000`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001` (login: admin / admin)

## 2.3 Monitoring tools are utilized
Check Prometheus targets:
- Open Prometheus UI → Status → Targets
- You should see `delvel-app` as **UP**

## 2.1 Performance metrics and feedback data are analyzed
In Prometheus UI, try these queries:
- Request rate: `rate(http_request_duration_seconds_count[1m])`
- Avg latency: `rate(http_request_duration_seconds_sum[1m]) / rate(http_request_duration_seconds_count[1m])`
- 95th percentile latency: `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`

## 2.4 Data are analyzed
You can look for slow requests or spikes in latency. If p95 grows, the app is slowing down.

## 2.5 Monitoring report is generated (simple example)
Create a short report with:
- Current request rate
- Average latency
- 95th percentile latency
- Any errors or spikes

Example report (fill values from Prometheus/Grafana):
- Date: YYYY-MM-DD
- Requests/sec: ___
- Avg latency (ms): ___
- p95 latency (ms): ___
- Notes: ___
