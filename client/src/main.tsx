import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/style.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { createStandaloneToast } from "@chakra-ui/react";
import { setContext } from "@apollo/client/link/context";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

type AUTH = {
  id: string;
  email: string;
  token: string;
  userName: string;
};

const authLink = setContext((_, { headers }) => {
  const userJSON = localStorage.getItem("user_auth");
  const user: AUTH = JSON.parse(userJSON as string);
  return {
    headers: {
      ...headers,
      authorization: user?.token ? `Bearer ${user?.token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:3001/gql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = extendTheme({ colors });
const { ToastContainer } = createStandaloneToast();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ToastContainer />
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
