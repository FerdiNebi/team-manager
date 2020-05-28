# Team manager

## How to setup locally

1. Install Docker and configure it to work with Linux containers (https://docs.docker.com/docker-for-windows/install/)
2. Pull the Github repo
3. Navigate to root path and execute "docker-compose up"

Note: Docker will require Firewall access and will require File sharing which will appear as notification. File sharing can be done from
Docker Settings => Resources => File sharing: you need to share the directory of the project.

Debugging:
To debug one of the services, build and run it as is, without using a container.
Change configuration.json in TeamManager.ApiGateway/configuration to send requests to the running instance using "host.docker.internal:5000" url
To access host from docker container use "host.docker.internal" instead of "localhost".
Use DB connection string: "server=127.0.0.1,1433;database=TeamManager;User Id=sa;Password=sa12345!;MultipleActiveResultSets=True"

To inspect DB in cotainer use SQL CMD in container console:
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "sa12345!"

https://azure.github.io/AppService/2018/05/07/Multi-container-Linux-Web-App.html

https://code.visualstudio.com/docs/containers/docker-compose