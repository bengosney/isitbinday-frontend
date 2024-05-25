.PHONY: help clean build deploy tag deploy
.DEFAULT_GOAL := build

DOCKER_IMAGE="isitbinday-front"

help: ## Display this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

node_modules: package.json
	npm install
	@touch $@

install: node_modules

build:
	docker build -t $(DOCKER_IMAGE) .

tag: build
	docker tag $(DOCKER_IMAGE) ghcr.io/bengosney/isitbinday-frontend:latest

deploy:
	docker push ghcr.io/bengosney/isitbinday-frontend:latest

login:
	echo "${GHCR_TOKEN}" | docker login ghcr.io -u "${GHCR_USER}" --password-stdin

run: build
	docker run -p 8000:80 $(DOCKER_IMAGE)
