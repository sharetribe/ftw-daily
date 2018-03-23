# Starting a new customisation project

To start a new project to customise the Starter App, you should create a separate Git repository and
setup the Git remotes so that you can pull in changes from the main (upstream) repository to your
custom repository.

## Fork the repository

See the [Fork a repo](https://help.github.com/articles/fork-a-repo/) documentation.

**Note:** If you want to make the fork to the same user, you have to start with an empty repository
and follow the next steps in that repository.

## Clone the fork

Go to the directory where you want to clone the repository and run:

```sh
git clone git@github.com:YOUR_USERNAME/YOUR_FORK.git
```

## Set up remotes

In your local fork repository, run:

```sh
git remote add upstream git@github.com:sharetribe/sharetribe-starter-app.git
```

See also the
[Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
documentation.

## Pull in latest upstream changes

In the `master` branch:

1.  Fetch the latest changes from the upstream repository:

    ```sh
    git fetch upstream
    ```

1.  Merge the changes to your local branch

    ```sh
    git merge upstream/master
    ```

1.  Fix possible merge conflicts, commit, and push/deploy.

See also the [Syncing a fork](https://help.github.com/articles/syncing-a-fork/) documentation.
