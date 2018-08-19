import GraphQLJSON from 'graphql-type-json';

import NisaCollection, { NisaCollection as NisaCollectionRest } from './NisaCollection/resolver';

const { Query: NisaCollectionQuery, Mutation: NisaCollectionMutation } = NisaCollection;

export default {
  JSON: GraphQLJSON,
  Query: Object.assign(
    {},
    NisaCollectionQuery
  ),
  Mutation: Object.assign({},
    NisaCollectionMutation
  ),
  NisaCollection: {
    ...NisaCollectionRest
  }
};

