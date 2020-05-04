FROM mcr.microsoft.com/dotnet/core/sdk:3.1
EXPOSE 5002

ENV ASPNETCORE_URLS=http://*:5002
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

WORKDIR /app

CMD ["/bin/bash", "-c", "dotnet restore ./TeamManager.FeedbackService/TeamManager.FeedbackService.csproj && dotnet watch --project ./TeamManager.FeedbackService/TeamManager.FeedbackService.csproj run"]
