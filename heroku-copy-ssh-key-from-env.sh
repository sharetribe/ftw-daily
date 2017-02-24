#!/usr/bin/env bash

# Since we have a dependency to a private GitHub
# `sharetribe/sharetribe-sdk-js` repository, we must give Heroku SSH
# access to there. This script copies the GITHUB_SSH_KEY to the
# current user to enable SSH access to the repository.

# NOTE: This script should be removed when the dependency is not a
# private repository anymore.

set -e

if [ -z "$GITHUB_SSH_KEY" ]
then
    echo "No GitHub SSH key to copy"
    exit 0
fi

echo "Copying GitHub SSH key"
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "$GITHUB_SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

echo "Adding GitHub SSH Host key to known hosts"
ssh-keyscan -H github.com >> ~/.ssh/known_hosts
chmod 600 ~/.ssh/known_hosts
