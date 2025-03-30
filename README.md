# Dream App

A web application for tracking your dreams and discovering others with similar dream experiences. This platform allows users to log their dreams and find patterns and connections with other dreamers.

## Overview

Dream App consists of a Next.js frontend and a Flask backend, containerized with Docker for easy setup and deployment.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Make sure to install the Docker CLI tools during setup
  - Verify installation with `docker --version` and `docker compose version`
- [Node.js and npm](#installing-nodejs-and-npm) (for frontend development)
- [Python](#installing-python) (for backend development)
- Git (to clone the repository)

## Installing Node.js and npm

### Windows
1. Download the installer from [Node.js official website](https://nodejs.org/)
2. Run the installer and follow the instructions
3. Verify installation: `node --version` and `npm --version`

### macOS
```bash
brew install node
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

## Installing Python

### Windows
1. Download the installer from [Python.org](https://www.python.org/downloads/)
2. Run the installer, check "Add Python to PATH"
3. Verify installation: `python --version`

### macOS
```bash
brew install python
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install python3 python3-pip
```

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/AldairPetronilia/dream-app.git
cd dream-app
```

### 2. Start the application
From the root directory of the project, run:
```bash
docker compose up
```
This command will:
- Build the Docker images if they don't exist
- Start the frontend and backend containers
- Connect the services so they can communicate with each other

To run in detached mode (in the background):
```bash
docker compose up -d
```

### 3. Access the application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)

## API Endpoints
- `GET /hello` - Test endpoint that returns a hello message
- `GET /` - Default endpoint for testing backend connectivity

## Project Structure
```
dream-app/
├── frontend/          # Next.js frontend application
├── backend/           # Flask backend API
└── compose.yaml       # Docker Compose configuration
```

## Technologies Used
- **Frontend**:
  - Next.js 15
  - React 19
  - TypeScript
  - TailwindCSS
  
- **Backend**:
  - Python 3.13
  - Flask 3.1+

## Stopping the Application
To stop the running containers while preserving data:
```bash
docker compose stop
```

To stop and remove the containers, networks, and images:
```bash
docker compose down
```

To completely remove everything including volumes (data):
```bash
docker compose down -v
```

## Development
For active development, you may want to run the services separately:

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install uv
uv sync
uv run src/main.py
```

## Troubleshooting
- **Docker Connection Issues**: Ensure Docker Desktop is running
- **Port Conflicts**: Make sure ports 3000 and 8080 aren't being used by other applications
- **Container Errors**: Check logs with `docker compose logs`
- **npm Issues**: Try clearing npm cache with `npm cache clean --force`
- **Python Environment Issues**: Consider using virtual environments with `python -m venv env`

## License
[Your license information here]
