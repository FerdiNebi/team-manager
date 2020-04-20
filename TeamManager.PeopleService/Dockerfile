FROM mcr.microsoft.com/dotnet/core/sdk:3.1
EXPOSE 5000

ENV ASPNETCORE_URLS=http://*:5000
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

WORKDIR /app

CMD ["/bin/bash", "-c", "dotnet restore ./TeamManager.PeopleService/TeamManager.PeopleService.csproj && dotnet watch --project ./TeamManager.PeopleService/TeamManager.PeopleService.csproj run"]