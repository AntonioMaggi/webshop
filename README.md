# Webshop Application

## Overview

This repository contains a template for a customizable webshop application built with Angular 17 and Node.js. The backend is powered by Node.js with MariaDB as the database, allowing users to manage products, categories, and upload product images.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Product Management:** Add, edit, and remove products with associated categories.
- **Category Management:** Organize products under different categories.
- **Image Uploads:** Upload and display product images.
- **RESTful API:** Backend API to interact with the product and category data.
- **Responsive Design:** Frontend is built using Angular 17 with a responsive UI.

## Technologies

- **Frontend:** Angular 17
- **Backend:** Node.js, Express.js
- **Database:** MariaDB
- **File Storage:** Multer for handling image uploads
- **ORM:** `mysql2/promise` for database interaction

## Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MariaDB
- Angular CLI

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/AntonioMaggi/webshop.git
   cd webshop
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**

   ```bash
   cd client
   npm install
   ```

4. **Setup Database:**

   - Create a MariaDB database using the provided SQL script.
   - Update the database connection details in `server/db.js`.

5. **Environment Variables:**

   Create a `.env` file in the `server` directory with the following variables:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=webshop
   PORT=5000
   ```

6. **Run the Application:**

   - Start the backend server:

     ```bash
     cd server
     node server.js
     ```

   - Start the Angular frontend:

     ```bash
     cd client
     ng serve
     ```

   The frontend should be available at `http://localhost:4200` and the backend at `http://localhost:5000`.

## Usage

### Adding Categories

1. Navigate to `http://localhost:4200/categories`.
2. Use the form to add new categories.

### Adding Products

1. Navigate to `http://localhost:4200/products`.
2. Fill out the form and upload an image to add a new product.

### Viewing Products

All products can be viewed on the homepage at `http://localhost:4200`.

## Folder Structure

```
webshop/
│
├── client/               # Angular frontend application
│   ├── src/
│   └── ...
│
├── server/               # Node.js backend application
│   ├── db.js             # Database connection setup
│   ├── server.js         # Main server file
│   ├── models/           # Database models and SQL scripts
│   └── ...
│
└── README.md             # Project documentation
```

## API Endpoints

### Products

- `GET /products` - Get all products with associated categories.
- `POST /products` - Add a new product.

### Categories

- `GET /categories` - Get all categories.
- `POST /categories` - Add a new category.

## Known Issues

- **Image Upload:** Ensure that the uploads directory has the correct permissions.
- **Database Connection:** If the application fails to connect to MariaDB, verify that the credentials are correct in the `.env` file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and commit them with clear commit messages.
4. Push your changes to your fork.
5. Submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
