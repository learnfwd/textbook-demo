#!/bin/bash

DATE=`date +'%F-%H-%M'`

cd ..
lfd clean
lfd compile
mv _build heroku/dist
cd heroku/dist

mv index.html home.html
find . -name '.?*' -exec rm -rf \{\} \;
mv ../deploy_template/.git ../deploy_template/index.php .

git add --all . && git commit -m "Release from $DATE" && git push heroku master && mv .git ../deploy_template/ && cd .. && rm -rf dist

