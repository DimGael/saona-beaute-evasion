# Salon d'Esthétique - Site Vitrine

Bienvenue sur le dépôt GitHub du site vitrine pour le salon d'esthéticienne **Saona Beauté Évasion**.

## 📌 Description
Ce projet est un site vitrine statique conçu pour présenter les tarifs salon d'esthéticienne **Saona Beauté Évasion**. Il a été développé avec HTML, CSS et utilise le framework TailwindCSS.

## Déploiement
Le site est hébergé sur **Netlify**, permettant un déploiement rapide et facile.

## 🛠 Technologies utilisées
- **HTML5**/**CSS3** avec **TailwindCSS**
- **Vite**
- **HCaptcha** pour sécuriser le formulaire de contact
- **Gmail** requis pour l'envoi de messages via le formulaire de contact

## 📂 Installation et utilisation
1. Clonez le dépôt :
   ```sh
   git clone git@github.com:DimGael/saona-beaute-evasion.git
   ```
2. Accédez au dossier du projet :
   ```sh
   cd saona-beaute-evasion
   ```
3. **(Facultatif)** Copier le fichier `.env.dist` dans un fichier `.env` et saisissez vos propres valeurs pour pouvoir tester le formulaire de contact
4. Installez les dépendances et démarrez le serveur de développement avec Vite :
   ```sh 
   # Using Makefile
   make install
   make serve

   # Or
   npm install
   npx @tailwindcss/cli -i ./input.css -o ./public/styles/output.css
   npm run dev
   ```
5. Ouvrez l'URL fournie par Vite dans votre navigateur.

### Commandes utiles

`make` ou `make help` -> pour afficher les commandes du Makefile

## 📜 Licence
Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le distribuer.
