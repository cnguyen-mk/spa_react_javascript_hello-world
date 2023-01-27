const { PrismaClient } = require('@prisma/client')
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@localhost:5432/mydb?schema=public',
    },
  },
})
