import { createSchema } from "graphql-yoga";
import { prisma } from "../lib/db";
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      User(id: ID!): User
      GetUsers: [User!]!
    }
    type User {
      id: ID!
      name: String!
      email: String!
      posts: [Post!]!
    }
    type Post {
      id: ID!
      title: String!
      content: String!
      published: Boolean!
      user: User!
      userId: ID!
    }
  `,
  resolvers: {
    Query: {
      User: async (id: number) => {
        return await prisma.user.findUnique({
          where: { id: id },
          include: { posts: true },
        });
      },
      GetUsers: async () => {
        return await prisma.user.findMany({ include: { posts: true } });
      },
    },
  },
});
