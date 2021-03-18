# Image
FROM node:14.15.4-alpine3.10

# Set up work directory
WORKDIR /var/www/client
# Create a group and user
RUN addgroup -S techdiary && adduser -S -G techdiary techdiary 
RUN chown techdiary:techdiary /var/www/client


COPY . .

RUN npm install

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Init command
CMD ["sh", "-c", "npm run build && npm start"]
