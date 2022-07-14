
#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

docker login
docker-compose build
docker push jclaveau/strapi-experiments-monocontainer:dev-local