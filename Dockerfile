# Étape 1 : Build du frontend Svelte
FROM node:20 AS front-build

WORKDIR /app/front
COPY front/package*.json ./
RUN npm install
COPY front/ .
RUN npm run build

# Étape 2 : back avec Node/Express + Python + streamrip
FROM node:20

# Installer Python et pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
 && rm -rf /var/lib/apt/lists/*

# Installer streamrip via pip
RUN pip3 install streamrip --break-system-packages
RUN rip config reset -y

# Répertoire de travail pour le back
WORKDIR /app

# Copier les fichiers back
COPY back/package*.json ./
RUN npm install
COPY back/ .

# Copier le build front dans le back (dossier public)
COPY --from=front-build /app/front/build ./public

EXPOSE 3000

CMD ["node", "index.js"]
