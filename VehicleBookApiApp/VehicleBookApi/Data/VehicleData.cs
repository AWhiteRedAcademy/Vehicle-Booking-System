using VehicleBook.Models;
using System.Text.Json;
using Microsoft.Data.SqlClient;

namespace VehicleBook.Data;

public class VehicleData
{
    public List<VehicleModel> Vehicles { get; private set; }

    public VehicleData()
    {
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        string filePath = Path.Combine(Directory.GetCurrentDirectory(),"Data", "vehicledata.json");

        string json = File.ReadAllText(filePath);

        //METHOD TO CONVERT Database data to JSON, then deserialize it to a list of VehicleModel objects that is then pushed to Endpoint.
        /*
        SqlConnection connection = new SqlConnection("Server=localhost;Database=LEWIS_STORE_STOCK;Trusted_Connection=True;TrustServerCertificate=True;");
        connection.Open();

        SqlCommand command = new SqlCommand("SELECT * FROM Products FOR JSON AUTO", connection);

        string jsonFromDb = command.ExecuteScalar()?.ToString() ?? "";
        */

        Vehicles = JsonSerializer.Deserialize<List<VehicleModel>>(json, options) ?? new();
    }
}
