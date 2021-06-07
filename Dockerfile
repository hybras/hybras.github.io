FROM klakegg/hugo:asciidoctor

RUN gem install asciidoctor-html5s
CMD hugo 
