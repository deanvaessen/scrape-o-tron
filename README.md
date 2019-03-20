# Prep
Create a `.env` file (see `.env.dist`) in this root directory with your environment. In it, you set your `NODE_ENV` that represents your intended environment, e.g.:
`NODE_ENV=dev`

Edit the configuration file for your environment (e.g: `prod.json`/`dev.json`) in the config folder. See `config.json.dist`.

@TODO: Installing packages

# How to run
@TODO: ...

# General notes:
* I did not add authentication between back-end and front-end. JWT tokens would be a good match for this
* Adding more search engines would be as simple as adding a new scraper in the middleware and adding the corresponding option in components/index.js
* As it is a rather simple application I have not added any store management such as Redux. Likewise, I have also not added a routing component.

# A note on architecture
In production:
- Back-end is run through docker, which serves the front-end (built by webpack)

In development:
- Back-end is run through docker
- Front-end is *not* run through docker. The reason for this is that I have historically had issues getting the live reload to work reliably. Sadly, this means I cannot share the apps config file between front & back-end for now and have to make a separate json. It remains in the docker-compose.yaml as a convenient way to build the front-end in production.
