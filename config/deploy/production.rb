set :stage, :production
set :branch, ENV['BRANCH'] || "production"
set :deploy_to, "/home/sharetribe/web/hotpatch.com"

namespace :deploy do
  after "symlink:release", :app_restart
  desc 'restart application'
  task :app_restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "pm2 kill"
      execute "cd /home/sharetribe/web/hotpatch.com/current && pm2 start server/index.js --name production"
      execute "pm2 save"
    end
  end
end

server 'www.hotpatch.com', port: 9922, user: 'sharetribe', roles: %w{app web db}
