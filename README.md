# eida-provider-svc
For instructions on how to implement and deploy this solution, please refer to the master [readme.md](https://github.com/maximusfederal/eida-keycloak-idp)

## Provider Services are protected by OAUTH2

* /provider/token endpoint will require Bearer JWT Access Token in the Authorization header

Start the service application in eclipse or in the terminal (./gradle -Dkeycloak.auth.server.url=http://localhost:9080/ bootRun or keycloak.auth.server.url=http://localhost:9080/ gradle bootRun).

Externalized Keycloak AUTH endpoint url, please run provider-svc passing env java -Dkeycloak.auth.server.url=http://localhost:9080/ -jar build/libs/eida-provider-svc-*.jar

# UI Configuration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/app` directory. Use the `--prod` flag for a production build.See below for additional environment profile configurations.

## Environment profiles

When creating a build of the project with `ng build`, you may specify one of three environment profiles via the `configuration` parameter. `ng build --prod` is an alias for the production profile. The options are as follows:

Dev: `ng build --configuration=dev`

Test: `ng build --configuration=test`

Prod: `ng build --configuration=production` or `ng build --prod`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
