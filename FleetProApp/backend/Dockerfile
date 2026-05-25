FROM mcr.microsoft.com/dotnet/sdk:10.0 AS builder

WORKDIR /build

COPY . .

RUN dotnet build Api/VehicleBook.csproj -c Release -o /build/output

FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY --from=builder /build/output .

EXPOSE 5000

ENTRYPOINT ["dotnet", "VehicleBook.dll"]
