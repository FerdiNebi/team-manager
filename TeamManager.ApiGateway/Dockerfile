FROM mcr.microsoft.com/dotnet/core/sdk:3.1
EXPOSE 443
EXPOSE 5004
EXPOSE 5005
EXPOSE 1433

ENV ASPNETCORE_URLS=http://*:5005
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

WORKDIR /app

CMD ["/bin/bash", "-c", "dotnet restore && dotnet watch run"]