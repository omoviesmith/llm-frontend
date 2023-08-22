# BlakGPT

## Steps to deploy

Initially build the project so that you can get static html files that can be deployed on any static hosting.

- Install Node.js
- run `npm install` to install all the dependencies of the project
- run `npm run build` to build the project
  - This will generate a `dist` folder which you can deploy on any static hossting

## Deploy to free hosting (Netlify, Vercel)

You can deploy without much hassle on free hosting services like Vercel, Netlify etc.
For that you simply have to create a project on the respective dashboard and import the github repository which contains the code.

Everything will be handled by those services and the website should be up in minutes without any hassle at all.

## Deploy to render

- Connect to your github account
- Import the repository containing the project code
- In next step, change the _Publish Directory_ to `dist`
- Press "Create static site"
