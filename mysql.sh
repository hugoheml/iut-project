#!/bin/bash
docker rm -f hapi-mysql 2>/dev/null || true
docker run -d --name hapi-mysql \
	-e MYSQL_ROOT_PASSWORD=hapi \
	-e MYSQL_ROOT_HOST='%' \
	-e MYSQL_DATABASE=user \
	-p 3306:3306 \
	mysql:8.0 --default-authentication-plugin=mysql_native_password