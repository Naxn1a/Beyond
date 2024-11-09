FROM oven/bun:latest AS base

WORKDIR /usr/src/app

FROM base AS install

RUN mkdir -p /temp

COPY package.json bun.lockb /temp/

RUN cd /temp && bun install --frozen-lockfile --production

FROM base AS prerelease

COPY --from=install /temp/node_modules node_modules

COPY . .

RUN bun test

FROM base AS release

COPY --from=install /temp/node_modules node_modules

COPY . .

EXPOSE 3579

ENTRYPOINT [ "bun", "src/app.ts" ]
