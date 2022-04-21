FROM alpine:3.7

LABEL author="wudexiong <1245295089@gmail.com>"
LABEL repository="https://github.com/wudexiong/blog"

# Install packages
RUN apk add --no-cache bash git jq
RUN apk add --no-cache python3 && python3 -m ensurepip && pip3 --no-cache-dir install --upgrade pip
RUN pip3 install requests PyGithub pathlib


COPY git-issues-blog.py /git-issues-blog.py
RUN chmod +x /git-issues-blog.py
ENTRYPOINT [ "/git-issues-blog.py" ]
