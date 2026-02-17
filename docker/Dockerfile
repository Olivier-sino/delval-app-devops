FROM node:18
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY ./src ./src
EXPOSE 3000
CMD ["pnpm", "start"]