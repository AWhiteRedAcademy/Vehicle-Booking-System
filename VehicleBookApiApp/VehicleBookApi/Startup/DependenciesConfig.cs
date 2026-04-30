using System.Runtime.CompilerServices;
using VehicleBook.Data;

namespace VehicleBook.Startup;

public static class DependenciesConfig
{
    public static void AddDependencies(this WebApplicationBuilder builder)
    {
        builder.Services.AddOpenApiServices();

        builder.Services.AddTransient<VehicleData>();

        builder.Services.AddAuthorization();
    }
}
