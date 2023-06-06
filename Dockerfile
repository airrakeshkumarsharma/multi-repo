# Download image of nodejs version 16 on alpine linux os
FROM node:16-alpine

# Once image is downloaded than now you are in alpine OS
# Here We are creating a WORKDIR where all our code is going to stay.
WORKDIR /app

# Now once directry is created copy package.json from host machine to docker apline machine with current directory
COPY package.json .

# As already you know install all dependencies which are in package.json file
RUN npm install

# Next copy all the files which are listed in current host directory
COPY . .

# If you see our application is running on 8080. So expose same port here also.
# NOTE: In future articles we will se how to paas environment variables from docker to application
EXPOSE 8000

# Add env varialbes which are required
ENV MONGODB_HOST=mongodb+srv://efm:aSE253nD3Gw8pE8X@cluster0.9kl2w.mongodb.net/?retryWrites=true&w=majority

ENV PORT=8000

# Finally start our application
CMD ["node", "index.js"]
