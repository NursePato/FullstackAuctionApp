# Fullstack Auction App

A full-stack auction web application built with React, ASP.NET Core, and SQL Server, providing a platform for users to create, view, and bid on auction items.
The backend was built together as a student group of 4 and the frontend was later on added individually during our first frontend course.

## Tech Stack

### Frontend:
- **React** – JavaScript library for building user interfaces
- **Vite** – Build tool for faster development

### Backend:
- **ASP.NET Core** – Web API for handling auction logic
- **Dapper** - micro ORM for database interactions
- **AutoMapper** – Simplifying object-to-object mapping
- **SQL Server** – Relational database for storing auction and user data

### Authentication & Security:
- **JWT (JSON Web Tokens)** – For user authentication

### Other Tools:
- **Swagger** – API documentation
- **xUnit & Moq** – Unit testing tools

## Features:
- User authentication (login and registration)
- Auction item creation, updating, deleting, viewing, and bidding

## Getting Started

### 1. Clone the repo:
Run the following command to clone the repository
```bash
git clone https://github.com/NursePato/FullstackAuctionApp.git
```

## 2. Set up the Backend:
Navigate to the backend/ folder
```bash
cd backend
```
Restore the dependencies
```bash
dotnet restore
```
Run the backend application
```bash
dotnet run
```

## 3. Set up the Frontend:
Navigate to the frontend/ folder
```bash
cd frontend
```
Install the dependencies
```bash
npm install
```
Run the frontend application
```bash
npm run dev
```

