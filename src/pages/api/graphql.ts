import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { PrismaClient } from '../../../codegen/prisma/client';
import resolvers from '../../../graphql/resolvers/root';
import { prisma } from '../../utils/prismaClient';

import typeDefs from '../../../graphql/typeDefs';

type ServerContext = {
  req: NextApiRequest
  res: NextApiResponse
}

export type UserContext = {
  user: User | null,
  prisma: PrismaClient
}

export default createServer<ServerContext, UserContext>({ 
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
  context: async (ctx) => {
    const superbaseClient = createServerSupabaseClient(ctx)
    const userResponse = await superbaseClient.auth.getUser()

    return {
      user: userResponse.data.user,
      prisma: prisma
    }
  }
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  }
}