.DEFAULT_GOAL := help

USERNAME_LOCAL = "$(shell whoami)"
UID_LOCAL = "$(shell id -u)"
GID_LOCAL = "$(shell id -g)"

TIME_ZONE ?= America/Lima

CLI_VERSION = 1.0.0
CLI_IMAGE = gateway_cli
APP_IMAGE = gateway_app
APP_VERSION = 0.1.0

NETWORK = auth

build_cli_image: ## Build cli image: make build_cli_image
	docker build --force-rm -t ${CLI_IMAGE}:${CLI_VERSION} docker/cli

npm_cli: ## Execute npm with COMMAND: make npm_cli COMMAND="run start:prod"
	docker run --rm -it \
		-v $$PWD/app:/app \
		-v $$PWD/logs:/home/node/.npm/_logs/ \
		-w="/app" ${FLAGS} \
		${CLI_IMAGE}:${CLI_VERSION} sh -c "npm ${COMMAND}"

create_network:
	docker network create --driver bridge ${NETWORK} || true

build_app_image: ## Build app image: make build_app_image
	docker build --force-rm --rm \
		--build-arg VERSION=${APP_VERSION} \
		--build-arg TIME_ZONE=${TIME_ZONE} \
		-t ${APP_IMAGE}:${APP_VERSION} -f docker/app/Dockerfile .

up: create_network build_app_image ## Up application: make up
	IMAGE=${APP_IMAGE}:${APP_VERSION} \
	NETWORK=${NETWORK} \
	docker-compose -f docker/docker-compose.yml up -d --build && \
	docker image prune --filter label=stage=intermediate -f

down:
	IMAGE=${APP_IMAGE}:${APP_VERSION} \
	NETWORK=${NETWORK} \
	docker-compose -f docker/docker-compose.yml down

## Help ##
help:
	@printf "\033[31m%-25s %-50s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-25s %-50s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-25s\033[0m %-49s \033[34m%s\033[0m\n", $$1, $$2, $$3}'