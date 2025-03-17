help: # Displays this help message
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

install: # Install dependencies and build
	npm i
	npx @tailwindcss/cli -i ./input.css -o ./public/styles/output.css

tailwind-watch: # Watch changes in HTML/CSS files to update output.css
	npx @tailwindcss/cli -i ./input.css -o ./public/styles/output.css --watch

serve: # Run project in localhost (via Vite)
	npx vite public
	
netlify-serve: # Run project in localhost with netlify functions (via Netlify)
	netlify dev

devfunctions: # Serve netlify function in dev mode (requires Netlify configured)
	netlify functions:serve
