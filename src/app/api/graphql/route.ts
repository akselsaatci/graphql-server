import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "@/../schema/schema";

// Create a Yoga instance with a GraphQL schema.
const { handleRequest } = createYoga({
  schema: schema,
  logging: "debug",
  graphiql: true,
  landingPage: false,

  fetchAPI: {
    Response,
    Request,
  },
});

export { handleRequest as GET, handleRequest as POST };
