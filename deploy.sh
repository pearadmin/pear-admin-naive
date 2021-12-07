#!/bin/sh
#pnpm run build &&
pwd &&
#zip -q -r -o dist.zip dist &&
scp -i '/Users/jiabinbin/.ssh/root' dist.zip root@115.126.75.120:/www/admin/naive.pearadmin.com_80/ &&
ssh -i '/Users/jiabinbin/.ssh/root' root@115.126.75.120 'cd /www/admin/naive.pearadmin.com_80/ ; ./deploy.sh' &&
rm -rf dist.zip &&
git status &&
git add . &&
git status &&
git commit -m 'wip: workspace' &&
git push origin master &&
echo 'task finished'
##
