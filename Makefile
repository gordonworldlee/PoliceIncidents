## Makefile for JusticeWatch project
## Inspired by https://github.com/vercel/next.js/blob/canary/examples/with-docker-multi-env/Makefile


# .PHONY: build-dev
# build-development: ## Run build; not required start-development (uses npm run dev)
# 	npm i
# 	npm run build

# .PHONY: start-dev
# start-development: ## Runs npm development server
#     npm run dev

.PHONY: build-base
build-base: ## Build the staging docker image.
	docker-compose -p justicewatch -f compose-base.yml build

.PHONY: start-base
start-base: ## Start the staging docker container.
	docker-compose -p justicewatch -f compose-base.yml up -d

.PHONY: stop-base
stop-base: ## Stop the staging docker container.
	docker-compose -p justicewatch -f compose-base.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker-compose -p justicewatch -f compose-prod.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker-compose -p justicewatch -f compose-prod.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker-compose -p justicewatch -f compose-base.yml -f compose-prod.yml down
