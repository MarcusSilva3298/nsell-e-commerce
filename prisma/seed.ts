import { PrismaClient, UserTypeEnum } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const adminEmail = 'admin@email.com';

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      id: '0195b3ed-727a-72a3-8815-5605193b418d',
      email: adminEmail,
      name: 'admin',
      password: '$2b$06$5oUqtLcaN6Sx/B/PMAvFmuudTowllwkE.gAuFyFMCitbuPMQ4rWZe',
      type: UserTypeEnum.ADMIN,
      verifiedEmail: true,
      Client: {
        connectOrCreate: {
          where: { id: '0195c5dc-06b1-7c24-bdfb-78f37970011d' },
          create: {
            id: '0195c5dc-06b1-7c24-bdfb-78f37970011d',
            address: 'Av. admin',
            contact: adminEmail,
            fullname: 'Admin Admin',
          },
        },
      },
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
