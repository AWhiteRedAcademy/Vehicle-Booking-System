using Scalar.AspNetCore;
using VehicleBook.EndPoints;
using VehicleBook.Startup;

namespace VehicleBook
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.AddDependencies();

            var app = builder.Build();

            app.UseOpenApi();
             
            app.UseHttpsRedirection();

            app.AddRootEndpoints();
            app.AddVehicleEndpoints();

            app.UseAuthorization();

            app.Run();
        }
    }
}
