FROM node:14-alpine
WORKDIR /app
COPY . .
RUN apk update && apk add bash
RUN npm install
EXPOSE 5000
CMD ["bash","./script.sh"]