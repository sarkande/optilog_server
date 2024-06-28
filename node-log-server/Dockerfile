# Utiliser l'image Node.js officielle comme image de base
FROM node:22

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install && npm install -g @angular/cli

# Copier le reste des fichiers de l'application
COPY . .

# Installer les dépendances de l'application Angular
RUN cd log-viewer && npm install

# Exposer les ports sur lesquels les applications s'exécutent
EXPOSE 5050
EXPOSE 4200

# Démarrer le serveur Node.js et servir l'application Angular
CMD ["npx", "concurrently", "\"npm start\"", "\"npm run start:ng\""]