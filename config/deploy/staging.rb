set :stage, :staging
set :branch, ENV['BRANCH'] || "staging"
set :deploy_to, "/home/sharetribe/web/staging.hotpatch.com"

namespace :deploy do
  after "symlink:release", :app_restart
  desc 'restart application'
  task :app_restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "pm2 kill"
      execute "cd /home/sharetribe/web/staging.hotpatch.com/current && pm2 start server/index.js --name staging"
      execute "pm2 save"
    end
  end
end

server 'staging.hotpatch.com', port: 9922, user: 'sharetribe', roles: %w{app web db}
