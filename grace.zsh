# edit url, baseurl in _config.yml
sd "url: https://hybras.github.io" "url: https://www.terpconnect.umd.edu" _config.yml
sd "baseurl: \"\"" "baseurl: \"/~vchari\"" _config.yml

bundle exec jekyll build --incremental

sd "url: https://www.terpconnect.umd.edu" "url: https://hybras.github.io" _config.yml
sd "baseurl: \"/~vchari\"" "baseurl: \"\"" _config.yml

sshpass -f ~/.umd scp -r _site  umdb:~/../pub