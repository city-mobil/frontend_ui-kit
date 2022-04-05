#!/bin/bash
IFS=', ' read -r -a addr_array <<< "$SERVER_ADDRR"

for element in "${addr_array[@]}"
do
  SSH_CMD="ssh -o StrictHostKeyChecking=no gitlab-runner@${element}"
  $SSH_CMD docker login $CI_REGISTRY -u gitlab-ci-token -p $CI_JOB_TOKEN
  $SSH_CMD docker pull $IMAGE || exit 1
  $SSH_CMD docker rm -f $CI_PROJECT_NAME-$CI_COMMIT_REF_NAME || echo nothing to remove
  $SSH_CMD docker run -d --name $CI_PROJECT_NAME-$CI_COMMIT_REF_NAME -p $DEPLOY_PORT:80 -h "\$HOSTNAME" --restart=always $IMAGE

  $SSH_CMD '[ `docker images | grep kit | wc -l` -gt 15 ] && docker rmi `docker images -a -q | tail -n +10` || echo "OK"'
done
