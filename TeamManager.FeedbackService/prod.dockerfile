FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS publish
WORKDIR /src
COPY ["TeamManager.FeedbackService.csproj", "./"]
RUN dotnet restore "./TeamManager.FeedbackService.csproj"
COPY . .
RUN dotnet publish "TeamManager.FeedbackService.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS final
EXPOSE 80
EXPOSE 443

WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TeamManager.PeopleFeedbackServiceService.dll"]
