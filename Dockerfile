# Étape 1 : Build du frontend Svelte
FROM node:24-alpine AS front-build

WORKDIR /app/front
COPY front/package*.json ./
RUN npm ci
COPY front/ .
RUN npm run build

# Étape 2 : back avec Node/Express + Python + streamrip
FROM node:24-slim

# Installer Python et pip
RUN apt-get update && apt-get install -y --no-install-recommends\
    python3 \
    python3-pip \
 && rm -rf /var/lib/apt/lists/*

# Installer streamrip via pip
RUN pip3 install streamrip --break-system-packages --no-cache-dir
RUN rip config reset -y

RUN useradd -m -s /bin/bash appuser

# Répertoire de travail pour le back
WORKDIR /app

# Copier les fichiers back
COPY back/package*.json ./
RUN npm ci
COPY back/ .

# Copier le build front dans le back (dossier public)
COPY --from=front-build /app/front/build ./public

EXPOSE 2130

CMD ["node", "index.js"]