FROM node:12 as build

ARG UI_KIT_TYPE

RUN node --version

COPY . /opt/ui-kit
WORKDIR /opt/ui-kit

RUN echo "registry=${NpmProxyUrl}" >> .npmrc

RUN npm ci
RUN npm run init
RUN npx lerna run build --scope @city/ui-kit-core
RUN npx lerna run build-storybook --scope @city/$UI_KIT_TYPE

FROM nginx:1.18.0

ARG UI_KIT_TYPE

COPY --from=build /opt/ui-kit/packages/$UI_KIT_TYPE/storybook-static /usr/share/nginx/root/
COPY .docker/default.conf /etc/nginx/conf.d/
