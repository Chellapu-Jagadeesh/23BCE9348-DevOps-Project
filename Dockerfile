FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 8081
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8081/health || exit 1
CMD ["node", "server.js"]