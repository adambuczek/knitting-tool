# /bin/bash

set -e

git merge main
npm run build
rm -rf docs
mv build docs
git add --force docs
git checkout origin/pages docs/CNAME
git commit -m "Publish"
git push