# config valid for current version and patch releases of Capistrano

set :application, "hotpatch"
set :repo_url, "git@github.com:Hotpatchdev/ftw-daily.git"

# Default branch is :master
# ask :branch, staging.chomp

# Default deploy_to directory is /var/www/my_app_name
set :keep_releases, 3
# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
append :linked_files, ".env"

# Default value for linked_dirs is []

set :nvm_type, :user
set :nvm_node, 'v14.15.4'
set :nvm_map_bins, %w{node npm yarn}

set :yarn_flags, %w(--silent --no-progress)

set :rocket_chat_webhook_url, "https://rocketchat.roobykon.net/hooks/fDdLwS8m5gyS7n3Lo/nEfTFTLzD9bHKuiNpiAXBFTRqbRPdtENaKZJ7wzEPDAztFbS"

namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build'
      end
    end
  end
  before "symlink:release", :yarn_deploy
end
