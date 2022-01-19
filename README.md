### Installation and Usage

Git clone the repository.

To run the local development environment use the following commands :

```bash
sudo docker-compose -f ./frontend/docker-compose.yml up --build
sudo docker-compose -f ./backend/docker-compose.yml up --build
```

To run the production version specify your own docker-compose file or use the given docker-compose-deploy.yml :

```bash
sudo docker-compose up -f ./frontend/docker-compose-deploy.yml --build
sudo docker-compose up -f ./backend/docker-compose-deploy.yml --build
```

### Prerequisites

You should have **docker** and **docker-compose** installed on your local system.
