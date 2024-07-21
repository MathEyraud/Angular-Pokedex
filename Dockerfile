# Étape de construction
FROM node:16 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer Angular CLI globalement
RUN npm install -g @angular/cli@16

# Étape de développement
FROM node:16 AS development

# Définir le répertoire de travail
WORKDIR /app

# Copier les dépendances
COPY --from=build /app /app

# Exposer le port 4200
EXPOSE 4200

# Commande pour démarrer le serveur de développement Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]

# Étape de production
FROM nginx:alpine AS production

# Copier les fichiers de build depuis l'étape de construction
COPY --from=build /app/dist/pokedex /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
