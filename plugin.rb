# name: suttacentral
# about: Creates links to Sutta Central
# version: 0.1.1
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
      since = params[:since] or '1900-01-01T00:00:00.000Z'
      time_query = "updated_at - :since::timestamp > interval '0.001 seconds' or deleted_at - :since::timestamp > interval '0.001 seconds'"
      time_query_cat = "updated_at - :since::timestamp > interval '0.001 seconds'";
      posts = Post.with_deleted
                  .where(time_query, {since: params[:since]})
                  .select('id, topic_id, post_number, cooked, hidden, user_deleted, updated_at, deleted_at')
                  .as_json
      topics = Topic.with_deleted
                    .where(time_query, {since: params[:since]}).select('id, title, posts_count, updated_at, deleted_at, views, slug, category_id')
                    .as_json
      categories = Category.where(time_query_cat, {since: params[:since]})
                           .select('id, name, slug, description, color, text_color, read_restricted, updated_at, parent_category_id')
                           .as_json

      topics.each {|t| t['tags'] = TopicCustomField.where(name: 'tags', topic_id: t['id']).order('updated_at').pluck(:value)}
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
