const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const serverless = require("serverless-http");

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
} = require("graphql");

const app = express();

app.use(express.json());

// The first element in the object, 'query', tells GraphQL how to handle a root query. Its value is a GraphQL object
// name - A reference used for documentation purposes
// fields - Defines the data the server will respond with 
const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'HelloWorld',
		fields: () => ({
			message: {
				type: GraphQLString,
				resolve: () => "Hello World"
			}
		})
	})
});

app.use(
	"/",
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

// .handler lets Netlify know that the serverless function is the Express function
module.exports.handler = serverless(app);