# Lord of the Rings

The app was prepared using `react-create-app`. You can run the app after installing the dependencies using `npm start` or `yarn start`.

## Current functionality

- As a user I can see a list of Lord of the Rings characters
- As a user I can filter this list by selecting a category, and see only relevant results
- As a user I can order the list alphabetically by `name` or by the arbitrary `significanceIndex` value

### Future improvements

- Use an actual server (This currently uses a JSON file for the list of characters)
- Enhance typescript
- Add selenium / cypress for integration tests
- Review performance

`yarn prepare` will install pre-commit library Husky to lint files at commit stage.
