import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 50; i++) {
    const email = faker.internet.email();
    const temp = await prisma.user.upsert({
      where: { email: email },

      update: {},

      create: {
        email: email,

        name: faker.person.firstName(),

        posts: {
          createMany: {
            data: [
              {
                title: faker.lorem.sentence(),

                content: faker.lorem.paragraphs(3),

                published: true,
              },
              {
                title: faker.lorem.sentence(),

                content: faker.lorem.paragraphs(3),

                published: true,
              },
              {
                title: faker.lorem.sentence(),

                content: faker.lorem.paragraphs(3),

                published: true,
              },
            ],
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
