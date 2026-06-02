# Vehicle-Booking-System

## Running with Docker

From the `FleetProApp` folder, run:

```bash
docker compose up --build
```

The app exposes:

- Frontend: `http://localhost:5174`
- Backend Swagger: `http://localhost:5020/swagger`
- RabbitMQ Management UI: `http://localhost:15672`

RabbitMQ login defaults to:

- Username: `guest`
- Password: `guest`

You can change the RabbitMQ ports or login in the `.env` file if needed.

## RabbitMQ integration

RabbitMQ is used for background system events. The main API workflow still saves to the database first. After that, it publishes events for:

- Booking notifications
- Booking status changes
- Vehicle status changes
- Audit logs
- Admin approval notifications

The backend consumer now reads notification events and creates in-app notifications for the correct users.

## In-app notifications

A `notifications` table is created automatically if it does not exist. The notification bell in the dashboard top bar now loads the current user's notifications and unread count.

Useful endpoints:

- `GET /api/Notifications/current`
- `GET /api/Notifications/current/unread-count`
- `PATCH /api/Notifications/{notificationId}/read`
- `PATCH /api/Notifications/current/read-all`

Current notification behavior:

- New Guest registration creates notifications for all Admin users.
- Approved Guest users receive an approval notification.
- New bookings notify the vehicle owner.
- Booking status changes notify the company.
- Vehicle status changes notify the owner.

## Email notifications

Email support is included but disabled by default. If email settings are not configured, the system still creates in-app notifications and logs that email sending is disabled.

To enable email, update `.env` or Docker environment variables:

```env
EMAIL_ENABLED=true
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your-smtp-username
EMAIL_PASSWORD=your-smtp-password
EMAIL_FROM_EMAIL=no-reply@example.com
EMAIL_FROM_NAME=FleetPro
EMAIL_ENABLE_SSL=true
```

RabbitMQ handles the background event work. SMTP handles the actual email delivery.
