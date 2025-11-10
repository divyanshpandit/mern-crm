# PERN Stack CRM

A full-stack Customer Relationship Management (CRM) application built with the PERN (PostgreSQL, Express, React, Node.js) stack. This application is fully containerized with Docker for easy setup and deployment.

## Features

*   **User Authentication:** Secure user registration and login with JWT authentication.
*   **Role-Based Access Control:** Different user roles (Admin, Manager, Sales Executive) with different permissions.
*   **Lead Management:** Create, Read, Update, and Delete (CRUD) operations for leads.
*   **Activity Tracking:** Log activities related to leads (e.g., creation, status changes).
*   **Dashboard:** A dashboard to visualize key metrics.
*   **Real-time Updates:** Real-time notifications for lead events using Socket.io.
*   **Scheduled Tasks:** A scheduler for sending reminders or performing other background tasks.

## Tech Stack

*   **Frontend:** React, Redux, Vite, Material-UI
*   **Backend:** Node.js, Express.js, Sequelize (with PostgreSQL)
*   **Database:** PostgreSQL
*   **Containerization:** Docker, Docker Compose
*   **Real-time:** Socket.io
*   **Authentication:** JWT

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/divyanshpandit/pern-crm.git
    cd pern-crm
    ```

2.  **Create the backend environment file:**
    Create a file named `.env` in the `backend` directory (`backend/.env`) and add the following content:
    ```
    JWT_SECRET=your_super_secret_jwt_key
    DB_USER=postgres
    DB_PASSWORD=mysecretpassword
    DB_NAME=crm_db
    CORS_ORIGIN=http://localhost:5173
    ```

3.  **Run the application with Docker Compose:**
    ```bash
    docker-compose up --build
    ```

4.  **Access the application:**
    *   **Frontend:** Open your browser and navigate to `http://localhost:5173`
    *   **Backend API:** The backend will be running on `http://localhost:5000`

## Deployment

This application is designed to be deployed using Docker containers. It can be deployed on cloud platforms like Azure, AWS, or Render.

For deployment, you will need to configure the environment variables in your deployment environment, especially `VITE_API_URL` for the frontend and `CORS_ORIGIN` for the backend, to use the public URLs of your services.

## API Endpoints

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Login a user.
*   `GET /api/leads`: Get all leads.
*   `POST /api/leads`: Create a new lead.
*   `GET /api/leads/:id`: Get a single lead.
*   `PUT /api/leads/:id`: Update a lead.
*   `DELETE /api/leads/:id`: Delete a lead.
*   `GET /api/activities/:leadId`: Get activities for a lead.
*   `POST /api/activities`: Create a new activity.
*   `GET /api/dashboard`: Get dashboard data.