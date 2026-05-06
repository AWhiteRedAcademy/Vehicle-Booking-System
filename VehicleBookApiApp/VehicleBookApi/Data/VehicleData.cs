using VehicleBook.Models;
using System.Text.Json;
using Microsoft.Data.SqlClient;
using MySql.Data.MySqlClient;

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
        string connectionString = "server=10.150.5.16;uid=VehicleBookConnect;pwd=Scoobydoo99;database=vehiclebook;";
        /*
        SqlConnection connection = new SqlConnection("Server=localhost;Database=LEWIS_STORE_STOCK;Trusted_Connection=True;TrustServerCertificate=True;");
        connection.Open();

        SqlCommand command = new SqlCommand("SELECT * FROM Products FOR JSON AUTO", connection);

        string jsonFromDb = command.ExecuteScalar()?.ToString() ?? "";
        */
        string jsonFromDb = "";

        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
            try
            {
                conn.Open();
                Console.WriteLine("Connection Successful!");

                // Example: Insert a user into the table you created
               // string sql = "SELECT CONCAT(\r\n    '[',\r\n    GROUP_CONCAT(\r\n        JSON_OBJECT(\r\n            'VehicleID', VehicleID,\r\n            'OwnerID', OwnerID,\r\n            'Model', Model,\r\n            'Make', Make,\r\n            'IsAvailable', IsAvailable,\r\n            'DailyRate', DailyRate, -- Added missing comma here\r\n            'Category', Category\r\n        )\r\n    ),\r\n    ']'\r\n) AS json_result\r\nFROM vehicles \r\nLIMIT 0, 25;";
               string sql = "SELECT * FROM vehicles";

                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    //jsonFromDb = cmd.ExecuteScalar()?.ToString() ?? "";
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Console.WriteLine(reader["VehicleID"]);
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }

        Vehicles = JsonSerializer.Deserialize<List<VehicleModel>>(jsonFromDb, options) ?? new();
    }
}
