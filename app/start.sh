cd api
forever start -c "yarn start" ./

cd ../blog
forever start -c "yarn start" ./
