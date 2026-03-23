# API (Hono + Deno) — отдельный сервис на Railway: корень билда = этот репозиторий, Dockerfile = этот файл.
FROM denoland/deno:2.1.4
WORKDIR /app
COPY server/ ./
ENV PORT=8080
EXPOSE 8080
CMD ["deno", "run", "--allow-net", "--allow-env", "index.tsx"]
