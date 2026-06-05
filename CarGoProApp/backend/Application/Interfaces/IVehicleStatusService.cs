using System.Threading;
using System.Threading.Tasks;

namespace VehicleBook.Application.Interfaces;

public interface IVehicleStatusService
{
    Task UpdateScheduledVehiclesAsync(CancellationToken cancellationToken);
}
