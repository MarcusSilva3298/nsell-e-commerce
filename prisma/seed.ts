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
