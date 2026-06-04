# FleetPro Vehicle Booking System

FleetPro is a vehicle booking system where vehicle owners can list vehicles, companies can book available vehicles, and admins can manage users.

The system has:

- A React frontend
- A .NET backend API
- A PostgreSQL database
- RabbitMQ for background system messages
- JWT login and role-based access
- In-app notifications

---

## Main user roles

### Admin

Admins manage users and approve registered users by giving them the correct role.

### Owner

Owners can add, edit, view, and remove their own vehicles. They can also view bookings linked to their vehicles.

### Company

Companies can view available vehicles and create bookings.

### Guest

New users register as Guests first. An Admin must update their role before they can use the main system.

---

## How the system works

1. A user logs in or registers.
2. The backend checks the user's details and returns a JWT token.
3. The frontend stores the token and uses it when calling protected API endpoints.
4. Users only see pages allowed for their role.
5. Booking and vehicle changes are saved to the database.
6. RabbitMQ receives system events, such as booking updates and vehicle status changes.
7. The notification service creates in-app notifications for the correct users.

---

## Project structure

```text
FleetProApp
├── backend
│   ├── Api
│   ├── Application
│   ├── Domain
│   └── Infrastructure
├── frontend
│   └── src
├── docker-compose.yml
└── .env
```

---

## Running the system with Docker

From the main `FleetProApp` folder, run:

```bash
docker compose up --build
```

Then open:

| Part | URL |
|---|---|
| Frontend | http://localhost:5174 |
| Backend Swagger | http://localhost:5020/swagger |
| RabbitMQ Dashboard | http://localhost:15672 |

Default RabbitMQ login:

```text
Username: guest
Password: guest
```

---

## Important notes

The `.env` file stores database, RabbitMQ, and email settings. Do not share real passwords or API keys in public repositories.

If Docker starts successfully but the app cannot load data, check that the database details in `.env` are correct.

If notifications are not appearing, check that RabbitMQ is running and that the backend can connect to it.

---

## Useful commands

### Start everything

```bash
docker compose up --build
```

### Stop everything

```bash
docker compose down
```

### Run frontend only

```bash
cd frontend
npm install
npm run dev
```

### Run backend only

```bash
cd backend/Api
dotnet run
```

---

## Summary

FleetPro is a full-stack vehicle booking system. The frontend handles the screens and user flow. The backend handles security, bookings, vehicles, users, notifications, and database access. Docker is used to run the system more easily, and RabbitMQ is used to process system events in the background.
