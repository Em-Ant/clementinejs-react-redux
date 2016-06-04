
clean:
	@echo "Building production.\n\nCleaning previous bundles..."
	@rm -rf ./dist/app ./dist/public ./dist/*.json ./dist/*.log ./dist/*.js

webpack:
	@echo "Packing..."
	@webpack -p && cp -R ./public ./dist && rm -f ./dist/public/static/*.map


babel-cli:
	@echo "Compiling ES6..."
	@babel app --out-dir ./dist/app && babel server.js --out-file ./dist/server.js


build: clean webpack babel-cli
	@cp package.json ./dist
	@echo "Done !"
