import { PrismaClient } from '../../codegen/prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient<{
    // log: {
    //     emit: "event";
    //     level: "query";
    // }[];
  }> | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    // log: [{
    //   emit: 'event',
    //   level: 'query',
    // }]
  })
  
// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

if (process.env.NODE_ENV !== 'production') {
  prisma.$use(async (params, next) => {
    const before = Date.now()
    const result = await next(params)
    const after = Date.now()
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
    return result
  })
  
  global.prisma = prisma
}

export {
  prisma
};

