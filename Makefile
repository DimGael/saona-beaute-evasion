help: # Displays this help message
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

install: # Install dependencies and build
	npm i
	npm run build

tailwind-watch: # Watch changes in HTML/CSS files to update output.css
	npx @tailwindcss/cli -i ./src/input.css -o ./public/styles/output.css --watch
	
serve: # Run project in localhost with netlify functions (via Netlify)
	netlify dev

render: # Renders html files using Handlebars template engine
	node src/render.js

watch: # Watch changes in Handlebars views to update public directory
	npm run watch

vite: # Serve project in localhost using vite (Vite has hot reload)
	npx vite public
