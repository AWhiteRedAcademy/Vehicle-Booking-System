# CarGoPro Developer Manual

## 1. System Overview

CarGoPro is a full-stack vehicle booking system. It allows:

- **Admin users** to manage users.
- **Owner users** to manage vehicles.
- **Company users** to browse vehicles and create bookings.

The system uses:

- **React** for the frontend.
- **ASP.NET Core Web API** for the backend.
- **PostgreSQL / Supabase** for the database.
- **RabbitMQ** for background messages and notifications.
- **JWT authentication** for secure login.
- **Docker Compose** to run the app services together.

---

## 2. Project Structure

```text
CarGoPro
├── backend
│   ├── Api
│   ├── Application
│   ├── Domain
│   └── Infrastructure
│
├── frontend
│   └── src
│
├── docker-compose.yml
└── .env
```

### Backend Layers

```text
Api -> Application -> Domain
Api -> Infrastructure
Infrastructure -> Application / Domain
```

### Layer Responsibilities

| Layer | Purpose |
|---|---|
| Api | Controllers, Swagger, CORS, JWT setup, service registration. |
| Application | DTOs, interfaces, booking logic, vehicle logic, service logic. |
| Domain | Core entities such as User, Vehicle, Booking, Notification, BookingAudit. |
| Infrastructure | Database context, repositories, RabbitMQ, notifications, JWT, email, workers. |

---

## 3. Main Backend Files

```text
backend/Api/Program.cs
backend/Api/Controllers
backend/Application/Services
backend/Application/Interfaces
backend/Application/Messaging/SystemEventMessage.cs
backend/Domain/Entities
backend/Infrastructure/Data/AppDbContext.cs
backend/Infrastructure/Repositories
backend/Infrastructure/Messaging
backend/Infrastructure/Notifications
backend/Infrastructure/Services
```

Important services:

| File | Purpose |
|---|---|
| BookingService.cs | Creates, updates, deletes bookings and creates audit rows. |
| VehicleStatusService.cs | Automatically updates booking and vehicle statuses. |
| VehicleStatusWorker.cs | Runs automatic vehicle/booking status checks in the background. |
| RabbitMqEventPublisher.cs | Sends normal system events to RabbitMQ. |
| RabbitMqEventConsumer.cs | Receives RabbitMQ events and creates notifications. |
| BookingAuditPublisherWorker.cs | Sends unpublished audit rows to RabbitMQ. |
| NotificationService.cs | Creates in-app notifications for users. |

---

## 4. Database Tables

Main tables:

| Table | Purpose |
|---|---|
| users | Stores system users and roles. |
| vehicles | Stores vehicles listed by owners. |
| bookings | Stores vehicle bookings made by companies. |
| notifications | Stores in-app notifications. |
| bookingaudit | Stores booking audit/outbox events. |

### User Roles

```text
Guest
Company
Owner
Admin
```

### Vehicle Statuses

```text
Available
In Use
Maintenance
```

### Booking Statuses

```text
Pending
Confirmed
Approved
Rejected
Cancelled
Completed
```

---

## 5. Authentication

The backend uses **JWT Bearer authentication**.

The frontend stores the token in `localStorage` and sends it with API requests:

```text
Authorization: Bearer {token}
```

Protected backend endpoints use:

```csharp
[Authorize]
[Authorize(Roles = "Admin")]
```

Frontend protected routes are handled in:

```text
frontend/src/components/routing/ProtectedRoute.jsx
```

---

## 6. Main API Areas

### Auth

```text
POST /api/Auth/login
POST /api/Auth/refresh-token
POST /api/Auth/forgot-password
POST /api/Auth/reset-password
```

### Users

```text
GET    /api/User
POST   /api/User/register
POST   /api/User/create
PUT    /api/User/{id}
DELETE /api/User/{id}
```

### Vehicles

```text
GET    /api/Vehicle
GET    /api/Vehicle/{id}
POST   /api/Vehicle
PUT    /api/Vehicle/{id}
DELETE /api/Vehicle/{id}
```

### Bookings

```text
GET    /api/Booking
GET    /api/Booking/company/current
GET    /api/Booking/company/history
GET    /api/Booking/owner/{ownerId}
POST   /api/Booking
PUT    /api/Booking/{id}
DELETE /api/Booking/{id}
```

### Notifications

```text
GET   /api/Notifications/current
GET   /api/Notifications/current/unread-count
PATCH /api/Notifications/{notificationId}/read
PATCH /api/Notifications/current/read-all
```

---

## 7. RabbitMQ and Notifications

RabbitMQ is used so notifications can be handled in the background.

Basic flow:

```text
Booking or vehicle action happens
        ↓
Backend publishes a SystemEventMessage
        ↓
RabbitMQ receives the message
        ↓
RabbitMqEventConsumer processes it
        ↓
NotificationService creates the notification
```

RabbitMQ exchange:

```text
fleetpro.events
```

Queues:

```text
fleetpro.notifications
fleetpro.audit
```

Common routing keys:

```text
booking.created
booking.updated
booking.status.changed
booking.deleted
vehicle.status.changed
admin.approval.requested
admin.approval.approved
audit.booking
```

---

## 8. Booking Audit / Outbox System

The audit/outbox system makes booking events safer.

Instead of only sending a RabbitMQ message directly, the system also stores a row in:

```text
public.bookingaudit
```

This helps because RabbitMQ may be down. If RabbitMQ fails, the audit row stays in the database and can be sent later.

### Audit Flow

```text
Booking created / updated / deleted / status changed
        ↓
BookingService or VehicleStatusService creates audit row
        ↓
bookingaudit.ispublished = false
        ↓
BookingAuditPublisherWorker checks unpublished rows
        ↓
Worker sends message to RabbitMQ
        ↓
bookingaudit.ispublished = true
```

### Important Audit Files

```text
backend/Domain/Entities/BookingAudit.cs
backend/Application/Interfaces/IBookingAuditRepository.cs
backend/Infrastructure/Repositories/BookingAuditRepository.cs
backend/Infrastructure/Messaging/BookingAuditPublisherWorker.cs
backend/Infrastructure/DatabaseScripts/20260604_CreateBookingAuditOutbox.sql
```

### Audit Events Created

| Action | Event Type |
|---|---|
| Booking created | BookingCreated |
| Booking updated | BookingUpdated |
| Booking deleted | BookingDeleted |
| Booking status changed | BookingStatusChanged |
| Automatic status changed to Completed | BookingStatusChanged |

### Main `bookingaudit` Fields

| Column | Purpose |
|---|---|
| auditid | Primary key. |
| bookingid | Related booking. |
| companyid | Related company user. |
| vehicleid | Related vehicle. |
| oldstatus | Previous status, if available. |
| newstatus | New/current status. |
| eventtype | Type of audit event. |
| message | Readable event message. |
| ispublished | Whether RabbitMQ publish succeeded. |
| publishedat | When the row was published. |
| createdat | When the row was created. |

---

## 9. Automatic Status Updates

The background worker checks bookings and updates statuses automatically.

File:

```text
backend/Application/Services/VehicleStatusService.cs
```

Current rules:

```text
If booking starts today and status is Pending:
    vehicle becomes In Use
    booking becomes Confirmed

If booking ended and status is Confirmed:
    vehicle becomes Available
    booking becomes Completed
```

These changes also create RabbitMQ events and audit rows.

---

## 10. Docker Setup

Run everything from the project root:

```bash
docker compose up --build
```

Main URLs:

```text
Frontend: http://localhost:5174
Backend Swagger: http://localhost:5020/swagger
RabbitMQ Dashboard: http://localhost:15672
```

RabbitMQ default login:

```text
username: guest
password: guest
```

---

## 11. Local Development

### Backend

```bash
cd backend/Api
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### EF Migration Commands

Create a migration:

```powershell
cd backend/Api

dotnet ef migrations add MigrationName `
  --project ../Infrastructure `
  --startup-project .
```

Apply migrations:

```powershell
dotnet ef database update `
  --project ../Infrastructure `
  --startup-project .
```

If `dotnet ef` is not installed:

```powershell
dotnet tool install --global dotnet-ef
```

---

## 12. Supabase SQL Setup

If EF migrations do not work, run the SQL scripts directly in Supabase SQL Editor.

Important scripts:

```text
backend/Infrastructure/DatabaseScripts/20260604_CreateBookingAuditOutbox.sql
backend/Infrastructure/DatabaseScripts/20260604_FullSupabaseSchema.sql
```

Useful audit checks:

```sql
SELECT *
FROM public.bookingaudit
ORDER BY createdat DESC
LIMIT 20;
```

Check unpublished audit rows:

```sql
SELECT *
FROM public.bookingaudit
WHERE ispublished = false
ORDER BY createdat ASC;
```

Check booking constraints:

```sql
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'public.bookings'::regclass;
```

---

## 13. Testing Checklist

### Test Login

1. Start the backend.
2. Open Swagger.
3. Use `/api/Auth/login`.
4. Copy the `accessToken`.
5. Click `Authorize`.
6. Paste only the token value.

### Test Booking Notifications

1. Create a booking as a company.
2. Check if the owner receives a notification.
3. Update a booking.
4. Check if the company and owner receive notifications.
5. Change booking status.
6. Check if the company receives a status notification.

### Test Audit Outbox

1. Create or update a booking through the API/frontend.
2. Run:

```sql
SELECT *
FROM public.bookingaudit
ORDER BY createdat DESC;
```

3. Confirm a row appears.
4. Confirm `ispublished` changes from `false` to `true`.

### Test RabbitMQ

1. Open RabbitMQ dashboard.
2. Go to **Queues and Streams**.
3. Check:

```text
fleetpro.notifications
fleetpro.audit
```

4. Booking events should create message activity.

---

## 14. Troubleshooting

### `dotnet ef` is not recognised

Install the EF tool:

```powershell
dotnet tool install --global dotnet-ef
```

Then close and reopen PowerShell.

### Package restore fails

Run:

```powershell
dotnet nuget locals all --clear
dotnet restore
dotnet build
```

### RabbitMQ does not connect

If running in Docker:

```text
HostName = rabbitmq
```

If running backend locally:

```text
HostName = localhost
```

### Notifications do not appear

Check:

```text
RabbitMQ is running.
RabbitMqEventConsumer is registered in Program.cs.
NotificationService handles the event type.
The target user exists.
The routing key is bound to the notification queue.
```

### Audit rows stay unpublished

Check:

```text
RabbitMQ is running.
BookingAuditPublisherWorker is registered in Program.cs.
The backend can connect to RabbitMQ.
bookingaudit rows have ispublished = false.
```

### Completed status fails

Make sure the database constraint includes:

```text
Completed
```

If not, run the audit/outbox SQL script again.

---

CarGoPro has a frontend, backend, database, and RabbitMQ message queue.

The frontend is what the user sees. The backend handles the rules and saves data. The database stores users, vehicles, bookings, notifications, and audit rows. RabbitMQ handles background events, such as sending notifications.

The audit/outbox table makes the system safer. If a booking changes but RabbitMQ is down, the event is still saved in the database and can be sent later.
