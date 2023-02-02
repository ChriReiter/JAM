#build with:
#docker build . -t matthiaswindisch/frnotendjam:v0.4

#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --development

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html
