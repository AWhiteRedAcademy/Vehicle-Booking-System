using VehicleBook.Data;

namespace VehicleBook.EndPoints;


public static class VehicleEndpoints
{
    public static void AddVehicleEndpoints(this WebApplication app)
    {
        app.MapGet("/vehicles", (VehicleData vehicleData) =>
        {
            return vehicleData.Vehicles;
        });
    }
}
