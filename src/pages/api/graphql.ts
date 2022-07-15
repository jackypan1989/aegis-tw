import { loadFilesSync } from '@graphql-tools/load-files';
import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';

import { mergeTypeDefs } from '@graphql-tools/merge';
import { PrismaClient } from '@prisma/client';
import { supabaseClient, User } from '@supabase/auth-helpers-nextjs';
import resolvers from '../../../graphql/resolvers/root';
import { prisma } from '../../utils/prismaClient';

const typesArray = loadFilesSync('graphql/**/*.gql')
console.log(typesArray)
// const resolversArray = loadFilesSync('graphql/**/*.ts', { extensions: ['ts']})
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
    typeDefs: mergeTypeDefs(typesArray),
    resolvers: resolvers,
  },
  context: async ({ req, res }) => {
    // get custom header value
    const { user } = await supabaseClient.auth.api.getUserByCookie(req, res)

    return {
      user: user,
      prisma: prisma
    }
  }
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}