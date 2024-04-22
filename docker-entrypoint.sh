#!/usr/bin/env bashsrc/app

if [[ "$1" == apache2* ]] || [ "$1" = 'php-fpm' ]; then
    echo "INSTALLING DEPENDENCIES with composer install"
    cd /usr/src/app && composer install
fi

echo "STARTING APACHE"

exec "$@"
