## About
This is a customised eCommerce application to cater to the needs of the steel and fabrication industry. This is would allow vendors to easily manage and sell their products and accept payments from their clients. It significantly reduces the friction of maintaining and managing a business.

## Getting started

### Prerequisites 
You should have **docker** and **docker-compose** installed on your local machine.
<br>

Git clone the repository.

```bash
git clone https://github.com/Atechchatterjee/ecommerce.git
```
### Running the front-end server

It uses React as the front-end library and uses Next-js for Static Site Generation (SSG)

```bash
cd ./frontend
sudo docker-compose build
sudo docker-compose up
```

### Running the back-end server

It runs a Django back-end and the PostgreSQL database in two separate docker containers.
For the production build it uses the uWSGI server.

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

## Technologies Used

- React js
- Next js
- Django
- Postgresql
- Docker & Docker-Compose

## TODOs 
- [x] Implement authentication. (Both user and admin)
- [x] Ability to add, modify and delete products.
- [x] Build out the shop to show items in the inventory.
- [x] Ability to add, modify and display categories. 
- [x] Ability to add GST for individual product.
- [x] Ability to add Specifications for each product.
- [x] Ability to add multiple images per product.
- [x] Ability to add custom units for each product.
- [x] Ability to add a range of prices (varying based on quantity).
- [ ]  Use Kafka/Rabbit MQ to handle checkout and shipping query. 
- [ ]  Reflect all orders and shipping queries in admin panel.
- [ ]  Integrate a payment gateway (Razorpay).
