# build 
FROM node as builder
WORKDIR /app
COPY . .
RUN yarn && yarn build

# 
FROM nginx
COPY --from=builder /app/build /var/www
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

