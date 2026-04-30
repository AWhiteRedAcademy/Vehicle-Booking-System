namespace VehicleBook.Models
{
    public class VehicleModel
    { 
           /* public int VehicleID { get; set; }
            public int OwnerID { get; set; }
            public required string Make { get; set; }
            public required string Model { get; set; }
            public required string Category { get; set; }
            public float DailyRate { get; set; }
            public bool IsAvailable { get; set; }
           */
            public int ProductID { get; set; }
            public string Name { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public decimal Price { get; set; }
            public int Stock { get; set; }
    }
}
