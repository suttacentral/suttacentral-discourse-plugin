# Suttacentral Discourse Plugin
This plugin integrates Discourse with Sutta Central

## Installation
* Run
[code]bundle exec rake plugin:install repo=https://github.com/suttacentral/suttacentral-discourse-plugin[/code]
* In development mode, run bundle exec rake assets:clean
* In production, recompile your assets: bundle exec rake assets:precompile
* Restart Discourse
* (If the above doesn't work, try sacrificing a chicken to get Discourse to
acknowldege the plugin)
