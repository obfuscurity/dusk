Vagrant.configure(2) do |config|
  config.vm.box = 'opscode_ubuntu-12.04_chef-11.2.0'
  config.vm.box_url = 'https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_chef-11.2.0.box'
  config.vm.network :forwarded_port, guest: 5000, host: 5000
  config.berkshelf.enabled = true

  config.vm.provision :chef_solo do |chef|
    chef.add_recipe 'dusk'
  end
end
