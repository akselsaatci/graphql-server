import DataLoader from "dataloader";
import { prisma } from "../../lib/db";
import { Post } from "@prisma/client";

export function postsDataLoader() {
  return new DataLoader<number, Post[]>(getPosts);
}

async function getPosts(keys: readonly number[]) {
  const posts = await prisma.post.findMany({
    where: {
      userId: {
        in: keys.map((key) => key),
      },
    },
  });

  const postsMap = new Map<number, Post[]>();
  posts.forEach((post) => {
    const postList = postsMap.get(post.userId) ?? [];
    postList.push(post);
    postsMap.set(post.userId, postList);
  });

  return keys.map((key) => postsMap.get(key) ?? []);
}
