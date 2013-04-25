require 'sinatra'
require 'rack-ssl-enforcer'
require 'sinatra_auth_github'
require 'json'
require 'uri'

module Dusk
  class Web < Sinatra::Base

    configure do
      enable :logging
      enable :sessions

      mime_type :js, 'text/javascript'

      use Rack::SslEnforcer if ENV['FORCE_HTTPS']

      set :session_secret, ENV['SESSION_SECRET'] || Digest::SHA1.hexdigest(Time.now.to_f.to_s)
      set :github_options, { :scopes => "user" }

      if ENV['GITHUB_AUTH_TEAM'] || ENV['GITHUB_AUTH_ORGANIZATION']
        register Sinatra::Auth::Github
      end
    end

    before do
      if team = ENV['GITHUB_AUTH_TEAM']
        github_team_authenticate!(team)
      elsif organization = ENV['GITHUB_AUTH_ORGANIZATION']
        github_organization_authenticate!(organization)
      end
    end

    get '/' do
      erb :index, :locals => {}
    end

    get '/metrics/find' do
      RestClient.get("#{ENV['GRAPHITE_URL']}#{request.env['REQUEST_URI']}")
    end

    get '/render/?' do
      RestClient.get("#{ENV['GRAPHITE_URL']}#{request.env['REQUEST_URI']}")
    end

    get %r{/metrics/(\S+)} do |metric|
      erb :index, :locals => { :target => URI.encode(metric) }
    end

    post %r{/favorites/(\S+)} do |metric|
      session[:favorites].push(metric)
      status 204
    end
  end
end

