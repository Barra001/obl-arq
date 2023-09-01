#Stage 1 - Install dependencies and build the app in a build environment
FROM debian:latest AS build-env
# Install flutter dependencies
RUN apt-get update
RUN apt-get install -y curl git wget unzip libgconf-2-4 gdb libstdc++6 libglu1-mesa fonts-droid-fallback lib32stdc++6 python3 sed
RUN apt-get clean
# Clone the flutter repo
RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter
# Set working directory for repository
WORKDIR /usr/local/flutter
# Fetch repository commits
RUN git fetch
# Checkout to project  flutter version 3.10.2 
RUN git checkout 9cd3d0d9ff05768afa249e036acc66e8abe93bff
# Reset working directory
WORKDIR /
# Set flutter path
ENV PATH="${PATH}:/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin"
# Create app folder
RUN mkdir /app/
# Copy project to app folder
COPY . /app/
WORKDIR /app/
# Build the project
RUN flutter build web -t lib/main_production.dart 

# Stage 2 - Run the built app in a nginx web server
FROM nginx:1.21.1-alpine
COPY --from=build-env /app/build/web /usr/share/nginx/html