import React, { useState } from "react";
import { supabase } from "../../HTTPS Services/supabaseClient.js";

const STANDARD_IMAGE_WIDTH = 800;
const STANDARD_IMAGE_HEIGHT = 450;

function resizeImageToStandardSize(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      image.src = event.target.result;
    };

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = STANDARD_IMAGE_WIDTH;
      canvas.height = STANDARD_IMAGE_HEIGHT;

      const context = canvas.getContext("2d");

      const imageRatio = image.width / image.height;
      const canvasRatio = STANDARD_IMAGE_WIDTH / STANDARD_IMAGE_HEIGHT;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (imageRatio > canvasRatio) {
        drawHeight = STANDARD_IMAGE_HEIGHT;
        drawWidth = image.width * (STANDARD_IMAGE_HEIGHT / image.height);
        offsetX = (STANDARD_IMAGE_WIDTH - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = STANDARD_IMAGE_WIDTH;
        drawHeight = image.height * (STANDARD_IMAGE_WIDTH / image.width);
        offsetX = 0;
        offsetY = (STANDARD_IMAGE_HEIGHT - drawHeight) / 2;
      }

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not resize image."));
            return;
          }

          const resizedFile = new File([blob], `vehicle-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });

          resolve(resizedFile);
        },
        "image/jpeg",
        0.85
      );
    };

    image.onerror = () => {
      reject(new Error("Invalid image file."));
    };

    reader.onerror = () => {
      reject(new Error("Could not read image file."));
    };

    reader.readAsDataURL(file);
  });
}

function VehicleImageUpload({ vehicleId, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = async (event) => {
    try {
      setUploading(true);
      setMessage("");

      const selectedFile = event.target.files[0];

      if (!selectedFile) {
        return;
      }

      const maxSizeBytes = 5 * 1024 * 1024;

      if (selectedFile.size > maxSizeBytes) {
        throw new Error("Image size is too large. Please upload an image under 5MB.");
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(selectedFile.type)) {
        throw new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
      }

      const resizedImage = await resizeImageToStandardSize(selectedFile);

      const filePath = `cars/${vehicleId}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("Vehicle Images")
        .upload(filePath, resizedImage, {
          upsert: true,
          contentType: "image/jpeg",
          cacheControl: "0",
        });

      if (uploadError) {
        throw uploadError;
      }

      setMessage("Image uploaded successfully!");

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Upload operation failed:", error);
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div style={{ margin: "15px 0" }}>
      <label
        htmlFor={`vehicle-upload-${vehicleId}`}
        style={{
          padding: "8px 16px",
          backgroundColor: uploading ? "#ccc" : "#1976d2",
          color: "#fff",
          borderRadius: "4px",
          cursor: uploading ? "not-allowed" : "pointer",
          display: "inline-block",
          fontWeight: "500",
        }}
      >
        {uploading ? "Uploading Photo..." : "Choose Vehicle Image"}
      </label>

      <input
        type="file"
        id={`vehicle-upload-${vehicleId}`}
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: "none" }}
      />

      {message && (
        <p
          style={{
            fontSize: "14px",
            marginTop: "8px",
            color: message.toLowerCase().includes("failed")
              ? "#d32f2f"
              : "#2e7d32",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default VehicleImageUpload;
