FROM node:13.3.0 AS compile-image

WORKDIR /opt/ng
COPY package.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build --prod

FROM nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=compile-image /opt/ng/dist/sede-angular/ /usr/share/nginx/html/

RUN ln -fs /usr/share/zoneinfo/Europe/Madrid /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Cuando el contenedor arranca, reemplaza los valores de env.js por los valores de las variables de entorno
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
