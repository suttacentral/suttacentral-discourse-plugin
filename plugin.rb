# name: suttacentral
# about: Creates links to Sutta Central
# version: 0.01
# author: Blake Walsh
# url: https://github.com/suttacentral/suttacentral-discourse-plugin

register_asset "javascripts/suttacentral.js"
register_asset "stylesheets/suttacentral.scss"

after_initialize do
  SUTTACENTRAL_URL = SiteSetting.suttacentral_url
  module ::SuttaCentral
    class Engine < ::Rails::Engine
      engine_name "suttacentral"
      isolate_namespace SuttaCentral
    end
  end
  
  require_dependency 'application_controller'
  class SuttaCentral::SutcenController < ::ApplicationController
    requires_plugin 'suttacentral'
    def index
      raise Discourse::InvalidAccess unless guardian.is_admin?
      time_query = "updated_at - ?::timestamp > interval '0'";
      posts = Post.with_deleted.where(time_query, params[:since]).select('id, topic_id, post_number, cooked, hidden, user_deleted, updated_at, deleted_at')
      topics = Topic.with_deleted.where(time_query, params[:since]).select('id, title, posts_count, updated_at, deleted_at, views, slug, category_id') 
      categories = Category.where(time_query, params[:since]).select('id, name, slug, description, color, text_color, read_restricted, updated_at, parent_category_id')
      
      render json: {posts: posts, topics: topics, categories: categories}
    end
  end

  SuttaCentral::Engine.routes.draw do
    get '/data' => 'sutcen#index'
  end

  Discourse::Application.routes.append do
    mount ::SuttaCentral::Engine, at: "/sutcen"
  end
  add_to_serializer(:site, :suttacentral_url) { SUTTACENTRAL_URL }
end
