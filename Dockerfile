FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
RUN ls
COPY . ./

COPY /*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ${file%.*}/ && mv $file ${file%.*}/; done
RUN ls

WORKDIR /app/src/OguzhanCan.Website
RUN dotnet restore
COPY . /build

RUN ls

#WORKDIR /OguzhanCan.Website
RUN dotnet publish -c Release -o out

WORKDIR /out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
RUN ls

COPY --from=build-env /app/src/OguzhanCan.Website/out/ .
ENTRYPOINT ["dotnet", "OguzhanCan.Website.dll"]