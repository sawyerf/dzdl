# Étape 1 : Build du frontend Svelte
FROM node:24-alpine AS front-build

WORKDIR /app/front
COPY front/*.json ./
RUN npm ci
COPY front/ .
RUN npm run build

# Étape 2 : back avec Node/Express + Python + streamrip
FROM node:24-alpine

# Installer Python et pip
RUN apk add --no-cache python3 py3-pip

# Installer streamrip via pip
RUN pip3 install --break-system-packages --no-cache-dir streamrip
RUN rip config reset -y

# Répertoire de travail pour le back
WORKDIR /app

# Copier les fichiers back
COPY back/package*.json ./
RUN npm ci --omit=dev
COPY back/ .

# Copier le build front dans le back (dossier public)
COPY --from=front-build /app/front/build ./public

ENV NODE_ENV=production

EXPOSE 2130

CMD ["node", "index.js"]