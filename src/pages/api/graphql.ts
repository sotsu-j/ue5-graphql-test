import type { NextApiRequest, NextApiResponse } from 'next'

import { ApolloServer } from 'apollo-server-micro'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'

import { Resolvers } from '../../types/generated/graphql';

// スキーマの定義
const schema = loadSchemaSync('./src/**/*.graphql', {
	loaders: [new GraphQLFileLoader()],
});

const resolvers: Resolvers = {
	Query: {
		users(parent, args, context) {
			return [
				{ id: "1", name: 'Nextjs' },
				{ id: "2", name: 'UE5' },
				{ id: "3", name: 'C++' },
				{ id: "4", name: 'Game' },
				{ id: "5", name: 'Hoge' },
			]
		},
		news() {
			return { text: 'today is good!' }
		},
	},
}

const apolloServer = new ApolloServer({ schema: addResolversToSchema({ schema, resolvers }) })

const startServer = apolloServer.start()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader(
		'Access-Control-Allow-Origin',
		'*'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	if (req.method === 'OPTIONS') {
		res.end()
		return false
	}

	await startServer
	await apolloServer.createHandler({
		path: '/api/graphql',
	})(req, res)
}

export const config = {
	api: {
		bodyParser: false,
	},
}