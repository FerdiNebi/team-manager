FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS publish
WORKDIR /src
COPY ["TeamManager.PeopleService.csproj", "./"]
RUN dotnet restore "./TeamManager.PeopleService.csproj"
COPY . .
RUN dotnet publish "TeamManager.PeopleService.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS final
EXPOSE 80
EXPOSE 443

WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TeamManager.PeopleService.dll"]
