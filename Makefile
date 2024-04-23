.PHONY: help;

init: ## Install dependencies and reload db schema
	docker exec -it backend composer install;
	make reload-schema 

reload-schema: drop-schema schema fixture ## Reload db schema

cache: ## Clear cache
	docker exec -it backend php bin/console cache:clear;

migration: ## Do migration
	docker exec -it backend php bin/console make:migration;
	docker exec -it backend php bin/console doctrine:migrations:migrate;

fixture: ## Add fixtures
	docker exec -it backend php bin/console doctrine:fixtures:load;

validate: ## Validate db Schema
	docker exec -it backend php bin/console doctrine:schema:validate;

schema: ## Create db schema
	docker exec -it backend php bin/console doctrine:schema:create;

drop-schema: ## Drop db schema
	docker exec -it backend php bin/console doctrine:schema:drop --force;

help:
	@echo "T-WEB-600 backend Tasks"
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""