function Restore-Project($project) {
    dotnet restore ("" + (get-location) + $project)
}

$projects = @("\TeamManager.ApiGateway\TeamManager.ApiGateway.csproj", "\TeamManager.FeedbackService\TeamManager.FeedbackService.csproj",
"\TeamManager.PeopleService\TeamManager.PeopleService.csproj")

foreach ($project in $projects) {
    Restore-Project($project)
}