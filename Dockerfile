FROM klakegg/hugo:asciidoctor

RUN gem install asciidoctor-html5s --no-document \
    && apk --no-cache add openssh sshpass gzip brotli

ENTRYPOINT [ "hugo" ]
