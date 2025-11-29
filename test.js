const prisma = require('./connect');

async function main() {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log('Connected!', result);
}

main().catch(console.error);
