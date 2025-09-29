help: # Displays this help message
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

install: # Install dependencies and build
	npm i
	npm run build

tailwind-watch: # Watch changes in HTML/CSS files to update CSS
	npx @tailwindcss/cli -i ./src/input.css -o ./public/styles/output.css --watch

tailwind: # Update CSS
	npx @tailwindcss/cli -i ./src/input.css -o ./public/styles/output.css
	
serve: # Run project in localhost with netlify functions (via Netlify)
	npm run build
	netlify dev

render: # Renders html files using Handlebars template engine
	node src/render.js

watch: # Watch changes in Handlebars views to update public directory
	npm run watch

vite: # Serve project in localhost using vite (Vite has hot reload)
	npx vite public

local-dev-start: install render # Install project, watch files for changes (watch and tailwind-watch), and serve project in localhost using vite
	make tailwind-watch &
	make watch &
	make vite
	
