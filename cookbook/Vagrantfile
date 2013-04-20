box = ENV['BOX'] || 'opscode_ubuntu-12.04_chef-11.2.0.box'
Vagrant.configure('2') do |config|
  config.vm.box = box
  config.vm.box_url = "https://opscode-vm.s3.amazonaws.com/vagrant/#{box}"
  config.vm.network :forwarded_port, guest: 5000, host: 5000
  config.berkshelf.enabled = true

  config.vm.provision :shell do |shell|
    shell.inline = 'test -f $1 || (sudo apt-get update -y && touch $1)'
    shell.args = '/var/run/apt-get-update'
  end
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe 'dusk'
  end
end
