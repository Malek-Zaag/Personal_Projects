FROM postgres:12.16-bullseye

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin


VOLUME [ "/var/lib/postgresql/data" ]
WORKDIR /
COPY init.sql /docker-entrypoint-initdb.d/
