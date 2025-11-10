# ---- Base Stage ----
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies
RUN npm install --production
COPY . .

# ---- Release Stage ----
FROM base AS release
COPY --from=dependencies /usr/src/app .
COPY start.sh .
RUN chmod +x ./start.sh

EXPOSE 5000
CMD ["./start.sh", "node", "index.js"]