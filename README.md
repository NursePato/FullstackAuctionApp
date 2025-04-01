# Fullstack Auction App

A full-stack auction web application built with React, ASP.NET Core, and SQL Server, providing a platform for users to create, view, and bid on auction items.
The backend was built together as a student group of 4 and the frontend was later on added individually during our first frontend course.

## Tech Stack

### Frontend:
- **React** – JavaScript library for building user interfaces
- **Vite** – Build tool for faster development

### Backend:
- **ASP.NET Core** – Web API for handling auction logic
- **SQL Server** – Relational database for storing auction and user data

### Authentication & Security:
- **JWT (JSON Web Tokens)** – For user authentication
- **BCrypt.Net** – For password hashing

### Other Tools:
- **Swagger** – API documentation
- **xUnit & Moq** – Unit testing tools
- **Postman** – API testing and debugging

## Features:
- User authentication (login and registration)
- Auction item creation, viewing, and bidding
- Admin panel to manage users and auction listings

## Getting Started

### 1. Clone the repo:
Run the following command to clone the repository

```bash
git clone https://github.com/your-username/FullstackAuctionApp.git
```

## 2. Set up the Backend:
Navigate to the backend/ folder
Restore the dependencies
Run the backend application
```bash
cd backend
dotnet restore
dotnet run
```

## 3. Set up the Frontend:
Navigate to the frontend/ folder
Install the dependencies
Run the frontend application

```bash
cd frontend
npm install
npm run dev

