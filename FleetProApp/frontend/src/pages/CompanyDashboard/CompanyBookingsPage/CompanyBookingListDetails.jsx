import { useMemo } from "react";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function CompanyBookingList({ 
    bookings = [], 
    searchTerm = "", 
    OwnerNameFilter = "all",
    DateFilter = "all"
}) {

    const filteredBookings = useMemo(() => {
            return bookings.filter((booking) => {
                const searchValue = searchTerm.toLowerCase();
    
                const matchesSearch =
                    booking.make?.toLowerCase().includes(searchValue) ||
                    booking.model?.toLowerCase().includes(searchValue) ||
                    booking.licenseNumber?.toLowerCase().includes(searchValue) ||
                    booking.category?.toLowerCase().includes(searchValue);
    
                const matchesCategory =
                    OwnerNameFilter === "all" || booking.ownerName === OwnerNameFilter;
    
                const DateFilter =
                    DateFilter === "all" || booking.date === DateFilter;
    
                return matchesSearch && matchesCategory && DateFilter;
            });
        }, [bookings, searchTerm, OwnerNameFilter, DateFilter]);

    return (
            <tbody>

            </tbody>
    );
}