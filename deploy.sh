#!/bin/sh
pnpm run build &&
pwd &&
zip -q -r -o dist.zip dist &&
scp -i '/Users/jiabinbin/.ssh/root' dist.zip root@163.53.219.60:/root/website/naive-admin/ &&
ssh -i '/Users/jiabinbin/.ssh/root' root@163.53.219.60 'cd /root/website/naive-admin/ ; ./deploy.sh' &&
rm -rf dist.zip &&
git status &&
git add . &&
git status &&
git commit -m 'fix: bugs' &&
git push origin main &&
echo 'task finished'
##
