# --platform=linux/x86-64 required for Fargate
FROM --platform=linux/x86-64 node:18

ARG SHA1
ENV SHA1 ${SHA1}

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .
RUN cp .env.production .env
RUN yarn
RUN yarn dist

EXPOSE 3000
CMD node dist/src/index.js