# React web app

This project was bootstrapped with CRA, see [Original Create React App README.md](./readme-cra.md).

**But customized though the template cra-template-web-architecture.** In case of improvements / dependencies upgrade, considere to apply the changes to that architectural template 🙂

## Architecture template

It is a base project for real use case projects.

Includes:
- Global app state managment (Redux) as a major design pattern
- Components like login page, header, sidebar, global notifications (Notifyer), conatiner component for displaying loader / error messages (SwitchStatus), etc
- Customized Celsa Group template / assets
- Lazy loaded routing and session token assertion
- BaseService for globaly setting headers and handling token expirity
- ESLint and Prettier configs for code quality and faster development process. For IDE and compiler
- VSCode integration, suggesting extensions, integrating code linting, debug config
- Selection of libraries, priorizing the popular & 'official' ones: Material UI, Redux Tooklit, CRA, Axios
- Opinionated files structure, design pattern, kind of best practices
- E2E Testing with cypress, including tests for Login page and custom command for getting valid token
- Customize-cra & react-app-rewired for extending Webpack config without ejecting from react-scripts
- Dockerfile with stages for install, build and publish through static web server

### APP Configuration

All configs are set by the file `public\config.json`
The file will be available by the web server, and its changes may be done in hot, no need of compiling sources.

### Session Managment

Router uses PrivateRoute component for restricting access to private part. Expired token drives user to Login page, see component TODO because its disabled by default.

Global state handles token retrieved by API or local storage together with BaseService witch controls expirity (30 minutes after last API sucessful fech).

### Testing

There is E2E scripts build for [Cypress](https://www.cypress.io/).

See node scripts related to cypress, i.e. `cypress:open` to open testing tool in wach mode
