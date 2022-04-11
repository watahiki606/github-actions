# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.154.0/containers/typescript-node/.devcontainer/base.Dockerfile

ARG VARIANT="3.8-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${VARIANT}

RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    && apt-get -y install git iproute2 procps \
&& curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
&& python3 get-pip.py \
&& pip install awscli 
ENV PROJECT_ROOTDIR /app/
RUN mkdir ${PROJECT_ROOTDIR}
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN apt-get -y install openjdk-11-jdk
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
# && export NVM_DIR="$HOME/.nvm" \
&& . /usr/local/share/nvm/nvm.sh \
&& . /usr/local/share/nvm/bash_completion \
&& nvm install v17.9.0 \
&& nvm use 17.9.0 
RUN apt-get -y install npm
# RUN cd cdk && npm install