docker:
    docker build . --tag hybras.dev/docker:latest

build:
    docker run --rm -v $(pwd):/src hybras.dev/docker:latest

server:
    docker run --rm -p 1313:1313 -v $(pwd):/src hybras.dev/docker:latest server -D
