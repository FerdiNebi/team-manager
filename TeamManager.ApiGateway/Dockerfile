FROM mcr.microsoft.com/dotnet/core/sdk:3.1
EXPOSE 5005

ENV ASPNETCORE_URLS=http://*:5005
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

WORKDIR /app

CMD ["/bin/bash", "-c", "dotnet restore ./TeamManager.ApiGateway/TeamManager.ApiGateway.csproj && dotnet watch --project ./TeamManager.ApiGateway/TeamManager.ApiGateway.csproj run"]