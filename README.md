### Installation and Usage

Git clone the repository.

```bash
git clone https://github.com/Atechchatterjee/ecommerce.git
```

Running the front-end server use the following commands:

```bash
cd ./frontend
sudo docker-compose build
sudo docker-compose up
```

Running the backend server use the following commands:

```bash
cd ./backend
sudo docker-compose build
sudo docker-compose up
```

To run the production version specify your own docker-compose file or use the given docker-compose-deploy.yml

```bash
sudo docker-compose -f ./name-of-your-docker-compose-file build
sudo docker-compose -f ./name-of-your-docker-compose-file up
```

### Prerequisites

You should have **docker** and **docker-compose** installed on your local system.

### Technologies Used

- React js
- Django
- Postgresql
- Next js
- Docker & Docker-Compose
