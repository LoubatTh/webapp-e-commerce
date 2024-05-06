# T-WEB-600

For this project we had to create a e-commerce website using Symfony, React, Postgres, Docker and Stripe.

## Team members

- Matteo Degano
- Ariirau Fucks
- Thomas Loubat

## Installation

```bash
docker compose up --build
```

If you want to run the app without Docker follow this steps:

### Frontend

prerequisites:

- Node 20.11 or higher
- Npm

```bash
npm i
npm run dev
```

### Backend

You will need to have a postgres database and update the database connector to run the backend without Docker.

prerequisites:

- PHP 8.2 or higher
- Composer
- Symfony cli

```bash
composer install
symfony server:start
```

## Tests

### Backend

```bash
php bin/phpunit
```