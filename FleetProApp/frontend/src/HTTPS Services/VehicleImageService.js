import { supabase } from "./supabaseClient.js";

export function getVehicleImageUrl(vehicleId, fileExtension = "jpg") {
  const filePath = `cars/${vehicleId}.${fileExtension}`;

  const { data } = supabase.storage
    .from("Vehicle Images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}