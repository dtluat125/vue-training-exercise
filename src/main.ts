import "nprogress/nprogress.css";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

const app = createApp(App);

// requireComponent.keys().forEach((fileName) => {
//   const componentConfig = requireComponent(fileName);

//   const componentName = upperFirst(
//     camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
//   );

//   app.component(componentName, componentConfig.default || componentConfig);
// });

// Apollo Client Config
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

// apolloClient.query({ query: ALL_BOOKS_QUERY }).then((res) => console.log(res));
app
  .provide(DefaultApolloClient, apolloClient)
  .use(store)
  .use(router)
  .mount("#app");
