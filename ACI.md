# Docker container on ACI (Azure Container Instances)

Docker container with scribble 

* https://hub.docker.com/r/biosmarcel/scribble.rs
* https://docs.microsoft.com/en-us/azure/container-instances/quickstart-docker-cli

* install Docker ACI Integration CLI for Linux https://docs.docker.com/engine/context/aci-integration/#install-the-docker-compose-cli-on-linux
    * now integrated in Docker Compose CLI
    * https://docs.docker.com/engine/context/aci-integration/#install-script
    * restart terminal
* docker login azure
    * browser should pop up to select account
* docker context create aci mdworldacicontext
    * e.g. select AzureFunctionsQuickstart-rg
* docker context ls (manual switching with `docker context use mdworldacicontext`)
* run & deploy (-p port mappings are not supported on ACI):

```
docker --context mdworldacicontext \
    run -p 3000:3000 \
    --name tinycors \
    mdworld/tinycors
```

and visit e.g. http://ip:3000/?get=http://ip-api.com/json
where "ip" is the IP listed in "Overview" on Azure Portal for this Container Instance.


```
docker --context mdworldacicontext \
    run -p 8080:8080 \
    --name scribble-rs \
    biosmarcel/scribble.rs
```

and visit e.g. http://ip:8080/
where "ip" is the IP listed in "Overview" on Azure Portal for this Container Instance.

TODO add some kind of authentication on this IP. See https://stackoverflow.com/a/60965775/7486264

On portal.azure.com, go to "Container Instances" (it may take some time for the container to show up)

## Failure

When failed to start and there are no logs to inspect (see below), go to the container on portal.azure.com to Settings > Containers > Events

Under "Events" the failure reason is logged.

Run locally to debug:

```
docker run --rm \
    --name scribble-rs \
    -p 8080:80 \
    biosmarcel/scribble.rs --portHTTP=80
```


## Inspection

This will only work when the container started and not failed

docker --context mdworldacicontext ps -a
docker --context logs scribble-rs

or look on logs tab on portal.azure.com