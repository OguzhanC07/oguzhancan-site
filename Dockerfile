FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# 1) Copy only the csproj, restore, to leverage Docker cache
COPY src/OguzhanCan.Website/OguzhanCan.Website.csproj ./src/OguzhanCan.Website/
RUN dotnet restore ./src/OguzhanCan.Website/OguzhanCan.Website.csproj

# 2) Copy the rest of the sources & publish
COPY . .
WORKDIR /app/src/OguzhanCan.Website
RUN dotnet publish -c Release -o /app/out

# 3) Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "OguzhanCan.Website.dll"]
