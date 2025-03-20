import { PrismaClient, UserType } from '@prisma/client';

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
      password: '$2y$10$u7HmjU8e62TIxhe70./tYeRIBt2f10inhNDM5PacsBF4uruhJuRFq',
      type: UserType.ADMIN,
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
