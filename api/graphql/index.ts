import { AzureFunction } from '@azure/functions'
import { ApolloServer } from 'apollo-server-azure-functions'
import 'reflect-metadata'
import * as tq from 'type-graphql'
import { resolvers } from '../prisma/generated/type-graphql'
import { prisma } from './context'
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core')

const httpTrigger: AzureFunction = async function (context, req) {
  const schema = await tq.buildSchema({ resolvers, validate: true })
  const server = new ApolloServer({
    schema,
    context: {
      prisma,
    },
    introspection: true,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  })
  const apolloHandler = server.createHandler({
    cors: {
      origin: ['*', 'https://studio.apollographql.com'],
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: [
        'access-control-allow-credentials',
        'access-control-allow-origin',
        'content-type',
      ],
    },
  })
  return new Promise((resolve, reject) => {
    console.log('request: ', context.req)
    apolloHandler(context, context.req)
  })
}

export default httpTrigger
