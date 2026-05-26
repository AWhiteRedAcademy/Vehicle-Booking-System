import React, { useEffect, useState, useMemo } from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { authFetch } from "../../../HTTPS Services/Auth.js"; 


import { AddVehicleCard, PlusCircle } from "./CompanyBookings.style.js";
import { 
    BookingInfo, 
    VehicleImage, 
    VehicleName, 
    VehicleMeta, 
    Badge, 
    StatusText, 
    ActionButton 
} from "../CompanyDashboard.style.js"; 

export default function CompanyBookingList({ 
    bookings = [], 
    searchTerm = "", 
    categoryFilter = "all",
    availabilityFilter = "all"
}) {
    
    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            const searchValue = searchTerm.toLowerCase();

            const matchesSearch =
                booking.make?.toLowerCase().includes(searchValue) ||
                booking.model?.toLowerCase().includes(searchValue) ||
                booking.registration?.toLowerCase().includes(searchValue) ||
                booking.category?.toLowerCase().includes(searchValue);

            const matchesCategory =
                categoryFilter === "all" || booking.category === categoryFilter;

            const matchesAvailability =
                availabilityFilter === "all" ||
                (availabilityFilter === "available" && booking.isAvailable) ||
                (availabilityFilter === "unavailable" && !booking.isAvailable);

            return matchesSearch && matchesCategory && matchesAvailability;
        });
    }, [bookings, searchTerm, categoryFilter, availabilityFilter]);

    // Render empty if no bookings match the filters
    if (filteredBookings.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
                        No bookings found matching the criteria.
                    </td>
                </tr>
            </tbody>
        );
    }
    return (
            <tbody>
                {filteredBookings.map((bookings) => (
                    <tr key={bookings.bookingId}>
                        <td>
                            <BookingInfo>
                                <VehicleImage>
                                    <DirectionsCarIcon fontSize="small" />
                                </VehicleImage>

                                <div>
                                    <VehicleName>
                                        {bookings.make} {bookings.model}
                                    </VehicleName>
                                    <VehicleMeta>{bookings.registration}</VehicleMeta>
                                </div>
                            </BookingInfo>
                        </td>

                        <td>
                            <Badge>{bookings.category}</Badge>
                        </td>

                        <td>
                            <StatusText $available={bookings.isAvailable}>
                                {bookings.isAvailable ? "Available" : "In Use"}
                            </StatusText>
                        </td>

                        <td>{bookings.currentBooking}</td>

                        <td>{bookings.nextService}</td>

                        <td>R{bookings.dailyRate}</td>

                        <td>
                            <ActionButton type="button">
                                <MoreVertIcon fontSize="small" />
                            </ActionButton>
                        </td>
                    </tr>
                ))}
            </tbody>
    );
}