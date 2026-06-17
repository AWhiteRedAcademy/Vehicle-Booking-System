-- Run this in Supabase SQL Editor before using the booking audit/RabbitMQ outbox worker.
-- It updates the allowed booking statuses and creates the booking audit outbox table.

ALTER TABLE public.bookings
DROP CONSTRAINT IF EXISTS bookings_status_check;

ALTER TABLE public.bookings
ADD CONSTRAINT bookings_status_check
CHECK (status IN ('Pending', 'Confirmed', 'Approved', 'Rejected', 'Cancelled', 'Completed'));

CREATE TABLE IF NOT EXISTS public.bookingaudit (
    auditid bigserial PRIMARY KEY,
    bookingid int NOT NULL,
    companyid int,
    vehicleid int,
    oldstatus varchar(20),
    newstatus varchar(20) NOT NULL,
    eventtype varchar(100) NOT NULL DEFAULT 'BookingStatusChanged',
    message text,
    ispublished boolean NOT NULL DEFAULT false,
    publishedat timestamp with time zone,
    createdat timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.bookingaudit
DROP CONSTRAINT IF EXISTS bookingaudit_status_check;

ALTER TABLE public.bookingaudit
ADD CONSTRAINT bookingaudit_status_check
CHECK (
    (oldstatus IS NULL OR oldstatus IN ('Pending', 'Confirmed', 'Approved', 'Rejected', 'Cancelled', 'Completed'))
    AND newstatus IN ('Pending', 'Confirmed', 'Approved', 'Rejected', 'Cancelled', 'Completed')
);

CREATE INDEX IF NOT EXISTS ix_bookingaudit_ispublished_createdat
ON public.bookingaudit (ispublished, createdat);
