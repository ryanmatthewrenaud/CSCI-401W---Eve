FROM python:3.10-alpine

RUN apk update && apk add vim nginx gcc musl-dev mariadb-connector-c-dev
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/eve
COPY eve/requirements.txt start-server.sh /opt/app/
COPY eve /opt/app/eve/
WORKDIR /opt/app
RUN pip install -r requirements.txt
RUN adduser -S www-data -u 1000
RUN chown -R www-data:www-data /opt/app

EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/start-server.sh"]

