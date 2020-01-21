# fgm-risk-assessment-tool

This project is for a risk assessment tool to be use by social workers assessing risk of female genital mutilation, and provides help and advice to social care professionals.

This project aims to build a production ready FGM Assessment Tool from the [initial prototype](https://github.com/barnardos/fgm-risk-assess). This tool will take a social worker through series of questions that will then curate a set of results depending on their answers. This FGM Assessment Tool is driven by JSON files that determine the content of the tool (allowing us to easily replicate this project for other Risk Assessment Tools in the future).

## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Install:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

Run these commands:

- `yarn` - install all dependencies.
- `yarn start` - start a development server.
- `yarn test` - run the test suite.

## Services

The providers are:

- [CircleCI](https://circleci.com) - continuous integration
- [Netlify](https://www.netlify.com) - continuous deployment

### Netlify

Deployment URLs:

- [Site](https://barnardos-fgm-risk-assessment-tool.netlify.com/)

## Environments

We make use of a `.env` file to store configuration required to run the application.

If you don't have a `.env` file already you can create one and add the following in order to get up and running:

```bash
  echo "REACT_APP_GOOGLE_ANALYTICS=UA-000000-0" > .env
```
