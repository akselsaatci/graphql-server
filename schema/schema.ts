import { createSchema } from "graphql-yoga";
import { prisma } from "../lib/db";
import * as DataLoader from "dataloader";
import { User } from "@prisma/client";

export const typeDefs = /* GraphQL */ `
  type Query {
    User(id: Int!): User
    Users(limit: Int): [User!]!
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
    userId: ID!
  }
`;

type UserQueryArgs = {
  id: number;
};

type UsersQueryArgs = {
  limit: number;
};

export const resolvers = {
  User: {
    posts: async (parent: User, _args: [], { postsLoader }: any) => {
      return postsLoader.load(parent.id);
    },
  },
  Query: {
    User: async (_: User, _args: UserQueryArgs) => {
      return await prisma.user.findFirst({
        where: { id: _args.id },
      });
    },
    Users: async (_: any, _args: UsersQueryArgs) => {
      return await prisma.user.findMany({ take: _args.limit });
    },
  },
};
