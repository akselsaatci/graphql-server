import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { typeDefs, resolvers } from "@/../schema/schema";
import DataLoader from "dataloader";
import { postsDataLoader } from "../../../../schema/dataloader/posts";
import { createSchema } from "graphql-yoga";


const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  logging: "debug",
  graphiql: true,
  landingPage: false,

  context: async () => ({
    postsLoader: postsDataLoader(),
  }),

  fetchAPI: {
    Response,
    Request,
  },
});

export { handleRequest as GET, handleRequest as POST };
