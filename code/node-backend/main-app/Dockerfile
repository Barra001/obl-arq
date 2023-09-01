#Stage 1 - Install dependencies and build the app in a build environment
FROM node as builder
# Create app directory
WORKDIR /usr/src/app
# Copy all files to the container
COPY . .
# Install app dependencies
RUN npm install
# Build the app
RUN npm run build

# Stage 2 - Run the built app
FROM node:slim
# Set the environment to production
ENV NODE_ENV production
# Set the user to use when running this image
USER node
# Create compiled directory
WORKDIR /usr/src/compiled
# Copy the built app from the builder stage
COPY --from=builder /usr/src/app .
# Expose the port the app runs in
EXPOSE 3002
# Run the app
CMD [ "node", "dist/index.js" ]