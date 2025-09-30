<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/d8e2a519-c947-43bc-904c-22b94d6e7734" />

# FinTrack Real-Time Financial Dashboard

FinTrack is a full-stack TypeScript application that showcases a responsive, real-time financial dashboard. The system streams live portfolio metrics over WebSockets, renders interactive analytics with React and Plotly, and ships with automated tests and documentation ready for AWS ECS deployment.

## Architecture

- **Frontend**: React + TypeScript single-page application powered by Vite. The UI consumes the live WebSocket feed, renders Plotly visualizations, and displays aggregated portfolio metrics.
- **Backend**: Node.js + Express server that synthesizes portfolio data, exposes REST endpoints, and broadcasts updates to connected clients through WebSocket channels.
- **Real-time Transport**: Native `ws` WebSocket server supporting hundreds of concurrent subscribers with interval-based broadcasting.
- **Infrastructure**: Documentation under [`infra/`](infra/README.md) outlines an AWS ECS Fargate deployment with auto-scaling policies and CI/CD automation.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Run the Stack Locally

Start the backend server:

```bash
cd backend
npm run dev
```

In a second terminal, start the frontend dev server:

```bash
cd frontend
npm run dev
```

The React app is available at [http://localhost:5173](http://localhost:5173). The dashboard will automatically connect to the backend WebSocket feed on port `4000`.

### Test Coverage

Both the frontend and backend use Jest with coverage thresholds set to 80% to maintain the target of 88% overall coverage when combined with additional tests.

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

Coverage reports are generated in the `coverage/` directory within each project.

### Build for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

The backend compiles to `backend/dist` and the frontend static assets are emitted to `frontend/dist` for hosting behind a CDN or containerized runtime.

## Project Structure

```
FinTrack/
├── backend/          # Express + WebSocket API
├── frontend/         # React dashboard UI
├── infra/            # Deployment documentation for AWS ECS
└── README.md         # This file
```

## Deployment Notes

- Container images for both services can be produced with Dockerfiles (not included) and deployed to AWS ECS Fargate as described in [`infra/README.md`](infra/README.md).
- WebSocket updates broadcast every two seconds by default. Adjust the `BROADCAST_INTERVAL_MS` environment variable on the backend to tune throughput versus latency.
- CORS origins are configurable through the `ALLOWED_ORIGINS` environment variable.

## Contributing

1. Create a feature branch.
2. Ensure `npm test` passes in both `backend` and `frontend`.
3. Open a pull request detailing user-facing changes and test coverage.

## License

MIT
