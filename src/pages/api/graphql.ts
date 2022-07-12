import { loadFilesSync } from '@graphql-tools/load-files';
import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';

import { mergeTypeDefs } from '@graphql-tools/merge';
import resolvers from '../../../graphql/resolvers/root';

const typesArray = loadFilesSync('graphql/**/*.gql')
// const resolversArray = loadFilesSync('graphql/**/*.ts', { extensions: ['ts']})

export default createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({ 
  schema: {
    typeDefs: mergeTypeDefs(typesArray),
    resolvers: resolvers,
  }
})

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}