import { ApolloServer } from "apollo-server-express";
import Schema from "./src/gql/schema/Schema";
import Resolvers from "./src/gql/Resolvers";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./src/app";
import DataBaseSource from "./src/config/database.config";

const PORT = process.env.PORT || 5030;

DataBaseSource.initialize()
  .then((res) => {
    console.log("Initialized database", res.options.database);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

async function startApolloServer(schema: any, resolvers: any) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => ({ req }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/gql",
  });

  try {
    await httpServer.listen({ port: PORT });
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  } catch (error) {
    console.error("Error: ", error);
    console.warn("Server closed");
    httpServer.close();
  }
}

startApolloServer(Schema, Resolvers);
