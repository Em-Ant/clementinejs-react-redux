
clean:
	@echo "Building production.\n\nCleaning previous bundles..."
	@rm -rf ./dist/app ./dist/public ./dist/*.json ./dist/*.log ./dist/*.js

webpack:
	@echo "Packing..."
	@webpack -p --config ./webpack.config.client.js && cp -R ./public ./dist && rm -f ./dist/public/static/*.map
	@NODE_ENV=production webpack -p --config ./webpack.config.server.js


build: clean webpack
	@cp package.json ./dist
	@echo "Done !"
