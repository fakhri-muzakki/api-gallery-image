import 'dotenv/config';
import prisma from '../src/libs/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  for (let i = 0; i < 100; i++) {
    await prisma.product.create({
      data: {
        name: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        image: faker.lorem.paragraph(),
      },
    });
  }
}

main()
  .then(() => console.log('Seed done'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
