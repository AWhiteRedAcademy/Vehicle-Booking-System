import React, { useMemo } from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';

import {
    VehicleInventoryGrid,
    VehicleInventoryCard,
    VehicleImageArea,
    VehicleImagePlaceholder,
    VehicleStatusBadge,
    VehicleTypeBadge,
    VehicleCardBody,
    VehicleCardHeader,
    VehicleTitle,
    VehiclePlate,
    VehicleMenuButton,
    VehicleInfoGrid,
    VehicleInfoItem,
    VehicleInfoLabel,
    VehicleInfoValue,
    VehicleCardDivider,
    VehicleCardActions,
    VehicleLinkButton,
    VehicleBookButton,
} from "./CompanyVehicles.style";

export default function CompanyVehicleList({
    vehicle = [],
    searchTerm = "",
    statusFilter = "all",
    typeFilter = "all",
    visibleCount = 6
}) {

    const filteredVehicles = useMemo(() => {
        return vehicle.filter((item) => {
            const searchValue = searchTerm.toLowerCase();

            const matchesSearch =
                item.make?.toLowerCase().includes(searchValue) ||
                item.model?.toLowerCase().includes(searchValue) ||
                item.licenseNumber?.toLowerCase().includes(searchValue) ||
                item.category?.toLowerCase().includes(searchValue);

            const matchesCategory =
                statusFilter === "all" || item.isAvailable === statusFilter;

            const matchesType =
                typeFilter === "all" || item.category === typeFilter;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [vehicle, searchTerm, statusFilter, typeFilter]);

    const paginatedVehicles = useMemo(() => {
        return filteredVehicles.slice(0, visibleCount);
    }, [filteredVehicles, visibleCount]);

    if (filteredVehicles.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', width: '100%', color: '#666' }}>
                No vehicles found matching the criteria.
            </div>
        );
    }

    if (filteredVehicles.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', width: '100%', color: '#666' }}>
                No vehicles found matching the criteria.
            </div>
        );
    }

    return (
        <VehicleInventoryGrid>
            {paginatedVehicles.map((v) => {

                const isBookable = v.isAvailable === "Available";

                return (
                    <VehicleInventoryCard key={v.vehicleId}>
                        <VehicleImageArea>
                            <VehicleImagePlaceholder>
                                <DirectionsCarIcon fontSize="large" />
                            </VehicleImagePlaceholder>

                            <VehicleStatusBadge $status={v.isAvailable}>
                                {v.isAvailable}
                            </VehicleStatusBadge>

                            <VehicleTypeBadge>{v.category}</VehicleTypeBadge>
                        </VehicleImageArea>

                        <VehicleCardBody>
                            <VehicleCardHeader>
                                <div>
                                    <VehicleTitle>
                                        {v.make} {v.model}
                                    </VehicleTitle>
                                    <VehiclePlate>
                                        PLATE: {v.licenseNumber || "N/A"} {v.modelYear ? `· ${v.modelYear}` : ""}
                                    </VehiclePlate>
                                </div>

                                <VehicleMenuButton type="button">
                                    <MoreVertIcon fontSize="small" />
                                </VehicleMenuButton>
                            </VehicleCardHeader>

                            <VehicleInfoGrid>
                                {v.isAvailable === "Available" && (
                                    <>
                                        <VehicleInfoItem>
                                            <CalendarMonthIcon fontSize="small" />
                                            <div>
                                                <VehicleInfoLabel>Last Service</VehicleInfoLabel>
                                                <VehicleInfoValue>{v.lastService || "N/A"}</VehicleInfoValue>
                                            </div>
                                        </VehicleInfoItem>

                                        <VehicleInfoItem>
                                            <SpeedIcon fontSize="small" />
                                            <div>
                                                <VehicleInfoLabel>Mileage</VehicleInfoLabel>
                                                <VehicleInfoValue>{v.mileage || "0 km"}</VehicleInfoValue>
                                            </div>
                                        </VehicleInfoItem>
                                    </>
                                )}

                                {v.isAvailable === "In Use" && (
                                    <>
                                        <VehicleInfoItem>
                                            <PersonIcon fontSize="small" />
                                            <div>
                                                <VehicleInfoLabel>Driver</VehicleInfoLabel>
                                                <VehicleInfoValue>{v.driver || "Assigned Driver"}</VehicleInfoValue>
                                            </div>
                                        </VehicleInfoItem>

                                        <VehicleInfoItem>
                                            <CalendarMonthIcon fontSize="small" />
                                            <div>
                                                <VehicleInfoLabel>Return Est.</VehicleInfoLabel>
                                                <VehicleInfoValue>{v.returnEstimate || "Pending"}</VehicleInfoValue>
                                            </div>
                                        </VehicleInfoItem>
                                    </>
                                )}

                                {v.isAvailable === "Maintenance" && (
                                    <>
                                        <VehicleInfoItem>
                                            <BuildIcon fontSize="small" />
                                            <div>
                                                <VehicleInfoLabel>Issue</VehicleInfoLabel>
                                                <VehicleInfoValue>{v.issue || "Scheduled Repairs"}</VehicleInfoValue>
                                            </div>
                                        </VehicleInfoItem>

                                        <VehicleInfoItem>
                                            <CalendarMonthIcon fontSize="small" />
                                            <div>
                                                <VehicleInfoLabel>Expected</VehicleInfoLabel>
                                                <VehicleInfoValue>{v.expected || "TBD"}</VehicleInfoValue>
                                            </div>
                                        </VehicleInfoItem>
                                    </>
                                )}
                            </VehicleInfoGrid>

                            <VehicleCardDivider />

                            <VehicleCardActions>
                                <VehicleLinkButton type="button">
                                    {v.isAvailable === "In Use"
                                        ? "View Journey"
                                        : v.isAvailable === "Maintenance"
                                            ? "View Service Log"
                                            : "View Details"}
                                </VehicleLinkButton>

                                <VehicleBookButton type="button" disabled={!isBookable}>
                                    Book Now
                                </VehicleBookButton>
                            </VehicleCardActions>
                        </VehicleCardBody>
                    </VehicleInventoryCard>
                );
            })}
        </VehicleInventoryGrid>
    );
}
