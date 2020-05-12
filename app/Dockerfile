# Stage 1 - Building
FROM node:12 as building
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN $(npm bin)/ng build --prod --source-map

# Stage 2 - Serving
FROM nginx:1.15.2-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /var/www
COPY --from=building /usr/src/app/dist/jet-showcase /var/www
