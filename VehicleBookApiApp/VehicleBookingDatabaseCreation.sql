CREATE DATABASE VehicleBook

use VehicleBook

CREATE TABLE Users(
UserID int IDENTITY(1,1) PRIMARY KEY,
Name VarChar(50)	NOT NULL,
Email VarChar(50),
Phone Varchar(20)	NOT NULL,
Password Varchar(255)NOT NULL,
Role VARCHAR(20) NOT NULL DEFAULT 'Guest' CHECK (Role IN ('Guest','Company','Owner','Admin'))
);

CREATE TABLE Vehicles(
VehicleID int IDENTITY(1,1) PRIMARY KEY,
OwnerID int,
Make VarChar(120)	NOT NULL,
Model VarChar(120)	NOT NULL,
Category VarChar(50) NOT NULL DEFAULT 'TBD' CHECK (Category IN ('Sedan', 'Hatchback', 'SUV', 'Convertible', 'Pickup Truck', 'Minivan/MPV')),
DailyRate decimal(10,2)NOT NULL,
IsAvailable bit	NOT NULL,
FOREIGN KEY (OwnerID) REFERENCES Users(UserID)
);



CREATE TABLE Bookings(
BookingID int IDENTITY(1,1) PRIMARY KEY,
CompanyID int	NOT NULL,
VehicleID int	NOT NULL,
StartDate date	NOT NULL,	
EndDate date	NOT NULL,
TotalCost decimal(10,2) NOT NULL,
Status VarChar(20) NOT NULL DEFAULT 'Pending' CHECK (Status IN ('Pending','Confirmed','Cancelled')),
FOREIGN KEY (CompanyID) REFERENCES Users(UserID),
FOREIGN KEY (VehicleID) REFERENCES Vehicles(VehicleID)
);