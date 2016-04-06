# Setup and Configuration Guide

### System requirement
- NodeJS
- MongoDB
- Python 2 (optional)

### Install the dependencies

Run ```npm install``` to install all the dependencies in the local node_modules folder.

### Add configuration files

You must add configuration file ```env.json``` to ```config/env/``` folder to define secret things.

```env.json``` must contain the following information:

- _BNET_ID:_
- _BNET_SECRET:_
- _CLOUD_NAME:_
- _CLOUDINARY_API_KEY:_
- _CLOUDINARY_API_SECRET:_
- _MONGODB_URL:_

### Get third-party resources

Run ```npm run-script get-resources``` to get javascript, css file of jquery, bootstrap, charjs and fontawesome.

Note that script is required Python 2 to run. If you do not want to use the script, you can also manually download them and put them into ```public/stylesheets``` and ```public/javascripts``` folder.

### Build admin page

We used ```ng-admin``` which is a client side administrator interface, so they must be built to be runnable in browser. In order to do this, run ```npm run-script build-admin```.

You should run the script every time changes are made in admin module.

### Run

Use ```npm start``` to run this project in development mode. After that, you can access via port 3000 (https) or 4000 (http)
