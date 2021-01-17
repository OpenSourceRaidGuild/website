# Raid Guild Frontend

> ✨ Bootstrapped with Create Snowpack App (CSA)

# Available Scripts

## Development

**Important!**

You will need to create a `.env` file in the root of the frontend folder, with a `SNOWPACK_PUBLIC_GITHUB_PAT` var set to your GitHub Personal Access token - see [Creating a Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). Token only needs `public_repo` permissions

### `yarn` or `yarn install`

Install your node_module dependecies to run the application locally.

### `yarn start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Testing

### `yarn test`

Launches Jest in the interactive watch mode.
**Currently broken, as Jest + ESM don't play nicely yet - fails when using `import.meta` to utilize env vars**

## Deploy

### yarn build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!
