FROM mcr.microsoft.com/dotnet/core/sdk:2.2 
EXPOSE 443
EXPOSE 5002
EXPOSE 1433

ENV ASPNETCORE_URLS=http://*:5002
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

WORKDIR /app

CMD ["/bin/bash", "-c", "dotnet restore && dotnet watch run"]