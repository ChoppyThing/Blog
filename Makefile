FIG=docker-compose
RUN=$(FIG) run --rm app
CONSOLE=bin/console

.DEFAULT_GOAL := help
.PHONY: help start stop reset db db-diff db-migrate db-rollback db-load watch clear clean test tu tf tj lint ls ly lt lj build up perm deps cc

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'


##
## Project setup
##---------------------------------------------------------------------------

start:          ## Install and start the project
start:
	$(FIG) up -d

stop:           ## Remove docker containers
	sudo cp -R data/postgres data/postgres-bkp/
	$(FIG) down

# Internal rules

build:
	$(FIG) build

unbuild:
	$(FIG) kill
	$(FIG) rm -v --force
