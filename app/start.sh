cd /var/www/Blog/app/api
forever start -c "yarn start" ./

cd /var/www/Blog/app/blog
forever start -c "yarn start" ./