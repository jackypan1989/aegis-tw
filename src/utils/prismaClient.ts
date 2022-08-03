import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query']
  })

// prisma.$use(async (params, next) => {
//   const before = Date.now()
//   const result = await next(params)
//   const after = Date.now()
//   console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
//   return result
// })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export {
  prisma
}
