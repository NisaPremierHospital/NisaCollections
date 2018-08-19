import { query as NisaCollectionQuery, mutation as NisaCollectionMutation, type as NisaCollectionType } from './NisaCollection/schema';
    
export default `
  scalar JSON

  type QueryResultsMetadata {
    count: Int
  }

  input StringArrayUpdate {
    index: Int,
    value: String
  }

  input IntArrayUpdate {
    index: Int,
    value: Int
  }

  input FloatArrayUpdate {
    index: Int,
    value: Float
  }

  ${NisaCollectionType}

  type Query {
    ${NisaCollectionQuery}
  }

  type Mutation {
    ${NisaCollectionMutation}
  }

`