tailwind:
	npx @tailwindcss/cli -i ./input.css -o ./public/styles/output.css --watch

serve:
	npx vite public

devfunctions:
	netlify functions:serve
