#!/bin/bash

DATE=`date +'%F-%H-%M'`
LFD=~/Documents/Code/lfa/bin/lfa

cd ..
$LFD clean
$LFD compile

mv _build heroku/dist
cd heroku/dist

mv index.html home.html
find . -name '.?*' -exec rm -rf \{\} \;
mv ../deploy_template/.git ../deploy_template/index.php .

git add --all . && git commit -m "Release from $DATE" && git push origin master && mv .git index.php ../deploy_template/ && cd .. && rm -rf dist

