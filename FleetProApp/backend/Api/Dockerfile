FROM ://microsoft.com AS build
WORKDIR /src
COPY . .
RUN dotnet publish "VehicleBook.csproj" -c Release -o /app/publish

FROM ://microsoft.com
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "VehicleBook.dll"]

