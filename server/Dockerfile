# API (Hono + Deno). В Railway: Root Directory = server, Dockerfile = Dockerfile
FROM denoland/deno:2.1.4
WORKDIR /app
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["deno", "run", "--allow-net", "--allow-env", "index.tsx"]
