import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Icons & UI Imports
import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";

import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { userIdParam } from "../../../constants/userHelper";
import { getVehicleById, updateVehicle } from "../../../HTTPS Services/VehicleServices";


function OwnerEditVehicle() {
  const navigate = useNavigate();
  const { id } = useParams(); // Extracts the vehicle ID string straight from the route parameter URL

  // Safe user token lookup fallback setup
  const token = localStorage.getItem("accessToken");
  let currentUserId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded[userIdParam] || "";
    } catch (e) {
      console.error("Failed to decode token inside vehicle editor:", e);
    }
  }

  const [formData, setFormData] = useState({
    id: id,
    ownerId: currentUserId,
    make: "",
    model: "",
    category: "Executive Sedan",
    dailyRate: "",
    isAvailable: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    getVehicleById(id)
      .then((data) => {

        setFormData({
          id: data.id || id,
          ownerId: data.ownerId || currentUserId,
          make: data.make || "",
          model: data.model || "",
          category: data.category || "Executive Sedan",
          dailyRate: data.dailyRate || "",
          isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to populate asset record data:", err);
        setError(err.message || "Failed to load vehicle profile information.");
        setIsLoading(false);
      });
  }, [id, currentUserId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleStatusChange(isAvailable) {
    setFormData((currentData) => ({
      ...currentData,
      isAvailable,
    }));
  }

  // 2. (PUT)
  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.make.trim() || !formData.model.trim()) {
      setError("Vehicle make and model details cannot be left blank.");
      return;
    }

    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      setError("Rental evaluation rate pricing tier must exceed 0.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const requestBody = {
        id: Number(formData.id),
        ownerId: Number(formData.ownerId),
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category,
        dailyRate: Number(formData.dailyRate),
        isAvailable: formData.isAvailable,
      };

      // Dispatches clean PUT request via fixed interceptor
      await updateVehicle(id, requestBody);
      
      // Navigate safely back to main console space
      navigate("/owner/dashboard");
    } catch (error) {
      setError(error.message || "Unable to modify database record asset profiles.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Edit Vehicle" subtitle="Loading record statistics...">
        <div style={{ padding: "2rem", textAlign: "center", fontWeight: "600", color: "#666" }}>
          Reading vehicle specifications data from server...
        </div>
      </DashboardLayout>
    );
  }

  return ( {}
  );
}

export default OwnerEditVehicle;
