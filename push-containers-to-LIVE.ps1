az login
az acr login -n ferdisregistry
docker push ferdisregistry.azurecr.io/teammanager.ui:latest
docker push ferdisregistry.azurecr.io/teammanager.apigw:latest
docker push ferdisregistry.azurecr.io/teammanager.feedbackservice:latest
docker push ferdisregistry.azurecr.io/teammanager.peopleservice:latest