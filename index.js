// const { ApolloServer, gql } = require('apollo-server');
// const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const app = express();
var config = require('./config');
// const { typeDefs, resolvers } = require('./schema');
var  MongoClient = require('mongodb').MongoClient;
// var mongoose = require('mongoose');

import expressGraphql from "express-graphql";
import resolvers from "./graphQL/resolver";
import schema from "./graphQL/schema";
import { makeExecutableSchema } from "graphql-tools";
const dbPromise = MongoClient.connect(
    config.mongodb.dbn,
    { useNewUrlParser: true }
  ).then(client => client.db(config.mongodb.db));

  const root = {
    db: dbPromise
  };
  const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async () => {
//     const client = await MongoClient.connect(config.mongodb.dbn, { useNewUrlParser: true });
//     await mongoose.createConnection(config.mongodb.dbn + '/' + config.mongodb.db, { useNewUrlParser: true });
//     return {
//         db: client.db(config.mongodb.db),
//         model: require('./model')
//     }
//   }
// });

app.use(
    "/",
    expressGraphql({
      schema: executableSchema,
      graphiql: true,
      rootValue: root
    })
  );

// app.get('/', (req, res) => res.send('Hello World!'))

// server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/`)
)

//console.log(`Server ready at http://localhost:4000/${server.graphqlPath}`)