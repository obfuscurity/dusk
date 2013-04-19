require 'rack/test'
require 'spec_helper'

require 'dusk/web'

describe Dusk::Web do
  include Rack::Test::Methods

  def app
    Dusk::Web
  end

  describe 'GET /' do
    context 'html' do
      it 'should return ok' do
        get '/'
        last_response.should be_ok
      end
    end
  end
end
