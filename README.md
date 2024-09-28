# Nova Dashboard Front End

This is the main frontend repository for the software part of a P3 project created by SW3 group 6 at Aalborg University
Copenhagen.

## Local Development

### Running the local development environment

To start the Docker Compose project, run:

```shell
docker compose up -d
```

or, when using JetBrains WebStorm, by running the `Docker Compose` run configuration.

Then, start a new shell session in the `node` container:

```shell
docker exec -it nova-dashboard-front-end-node-1 /bin/sh
```

The first time the project is cloned, or when dependencies in [`package.json`](./package.json)
or [`package-lock.json`](./package-lock.json) have changed, in the `node` container run:

```shell
npm install
```

Now the development server can be started in the `node` container:

```shell
npm run dev
```

The front end is now accessible at [localhost:3000](http://localhost:3000/).

When code is pushed to the remote repository, the
[Formatting And Linting](./.github/workflows/formatting-and-linting.yml) workflow is run.
Therefore, check your code for errors before committing and pushing by running the tools in the `node` container
first:

```shell
npm run prettier && npx eslint .
```

To check whether the project can be compiled for production, run the `build` command:

```shell
NODE_ENV=production npm run build
```

Then, start the production server with:

```shell
NODE_ENV=production npm run start
```

After a finished development cycle, exit the `node` container and run:

```shell
docker compose down
```
