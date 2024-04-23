#!/usr/bin/env bash

if [[ "$1" == apache2* ]] || [ "$1" = 'php-fpm' ]; then
    echo "INSTALLING DEPENDENCIES with composer install"
    cd /usr/src && composer install
fi

echo "STARTING APACHE"

exec "$@"
