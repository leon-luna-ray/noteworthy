# Noteworthy

Full-stack notes application. It is designed for keeping simple notes.

## Technologies Used

**Backend**
- Python
- FastAPI
- Postgres
- Docker
- Fly.io

**Frontend**
- JavaScript
- React.js
- TailwindCSS

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/noteworthy.git
    cd noteworthy
    ```

2. Create a `.env` file based on the `.env.example` file and fill in the necessary environment variables:

    ```sh
    cp .env.example .env
    ```

3. Build and start the application using Docker Compose:

    ```sh
    docker-compose up --build
    ```

4. The application should now be running and accessible at `http://localhost:8080`.

## Environment Variables

The application requires the following environment variables to be set:

- `DATABASE_URL`: The URL of the PostgreSQL database
- `SECRET_KEY`: A secret key for JWT authentication
- `CORS_ALLOWED_ORIGINS`: A comma-separated list of allowed origins for CORS

Refer to the `.env.example` file for more details.

## Deployment

The application is deployed on Fly.io. To deploy your own instance, follow the Fly.io documentation for setting up and deploying a FastAPI application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
