FROM node:20.11.0-alpine as builder
WORKDIR /vietcom-id-admin-space

COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:20.11.0-alpine as runner
WORKDIR /vietcom-id-admin-space
RUN npm install -g serve
COPY --from=builder /vietcom-id-admin-space/package.json .
COPY --from=builder /vietcom-id-admin-space/node_modules ./node_modules
COPY --from=builder /vietcom-id-admin-space/build ./build
COPY --from=builder /vietcom-id-admin-space/public ./public

EXPOSE 8081
CMD npm run production