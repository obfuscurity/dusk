package 'git'

include_recipe 'runit'

user node[:dusk][:user]

deploy_revision node[:dusk][:root] do
  repo node[:dusk][:repo]
  revision node[:dusk][:revision]
  symlink_before_migrate.clear
  keep_releases 0
  before_restart do
    execute 'bundle install'
  end
  notifies :restart, 'runit_service[dusk]'
end

runit_service 'dusk' do
  action [:enable]
  default_logger true
  env(node[:dusk][:env].dup)
  options(node[:dusk].dup)
end
