#!/bin/bash

BRANCH=$1

CURRENT_BRANCH=$(git symbolic-ref --short -q HEAD)

if [ -z "$BRANCH" ]
then
      echo "You must specify branch"
      exit 1
fi

git fetch --all
git branch -D preview
git checkout -b preview $BRANCH

checoutingCode=$?
if [ $checoutingCode -ne 0 ]
then
      echo "An error occured with checkouting branch"
      exit 1
fi

git push --force --set-upstream origin preview

git checkout $CURRENT_BRANCH
