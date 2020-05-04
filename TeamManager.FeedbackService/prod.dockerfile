FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS publish
WORKDIR /src
COPY ["TeamManager.Shared/TeamManager.Shared.csproj", "./TeamManager.Shared/"]
COPY ["TeamManager.FeedbackService/TeamManager.FeedbackService.csproj", "./TeamManager.FeedbackService/"]
RUN dotnet restore "./TeamManager.FeedbackService/TeamManager.FeedbackService.csproj"
COPY . .
RUN dotnet publish "./TeamManager.FeedbackService/TeamManager.FeedbackService.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS final
EXPOSE 80
EXPOSE 443

WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TeamManager.FeedbackService.dll"]
