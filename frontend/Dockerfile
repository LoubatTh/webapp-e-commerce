FROM node:alpine AS vite-builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM httpd:alpine

COPY --from=vite-builder /app/dist /usr/local/apache2/htdocs

EXPOSE 80

CMD ["httpd-foreground"]