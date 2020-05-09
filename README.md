# team-manager

Debugging:
To access host from docker container use "host.docker.internal" instead of "localhost".
Use DB connection string: "server=127.0.0.1,1433;database=TeamManager;User Id=sa;Password=sa12345!;MultipleActiveResultSets=True"

SQL CMD in container console:
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "sa12345!"