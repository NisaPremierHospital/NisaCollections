import React, { Component } from 'react';
// import { ApolloProvider } from "react-apollo";
import logo from './logo.png';
import './App.css';
import GraphiQL from 'graphiql';

// import GraphiQL from './graphiql/src';

import fetch from 'isomorphic-fetch';
import 'graphiql-material-theme'
import defaultQuery from './defaultQuery'

// import '../node_modules/graphiql/graphiql.css';

// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//   uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
// });

function graphQLFetcher(graphQLParams) {
  return fetch(process.env.REACT_APP_GRAPHQL + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
};



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // REQUIRED:
      // `fetcher` must be provided in order for GraphiQL to operate
      fetcher: graphQLFetcher,

      // OPTIONAL PARAMETERS
      // GraphQL artifacts
      query: defaultQuery,
      variables: '',
      response: '',

      editorTheme: "material",

      // GraphQL Schema
      // If `undefined` is provided, an introspection query is executed
      // using the fetcher.
      schema: undefined,

      // Useful to determine which operation to run
      // when there are multiple of them.
      operationName: null,
      storage: null,
      defaultQuery: defaultQuery,

      // Custom Event Handlers
      onEditQuery: null,
      onEditVariables: null,
      onEditOperationName: null,

      // GraphiQL automatically fills in leaf nodes when the query
      // does not provide them. Change this if your GraphQL Definitions
      // should behave differently than what's defined here:
      // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
      getDefaultFieldNames: null
    };
  }

  render() {
    return (
      <GraphiQL ref={c => { this.graphiql = c; }} {...this.state}>
      
      <GraphiQL.Logo>
        <img src={logo} height="40" className="Nisa Premier" alt="logo" />
      </GraphiQL.Logo>
      
      <GraphiQL.Toolbar>

          <GraphiQL.Button
            onClick={ (e ) => {
              const editor = this.graphiql.getQueryEditor();
              const currentText = editor.getValue();
              const { parse, print } = require('graphql');
              try{
                const prettyText = print(parse(currentText));
                fetch(process.env.REACT_APP_GRAPHQL + '/exportToExcel', { //http://graphql:9000/
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({code: prettyText})
                })
                .then(async response => ({
                  fileName: response.headers.get('content-disposition').split('filename=')[1],
                  blob: await response.blob()
                }))
                .then(({ fileName, blob }) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  document.body.appendChild(a);
                  a.style = "display: none";
                  a.href = url;
                  a.download = fileName;
                  a.click();
                  window.URL.revokeObjectURL(url);
                })
                .catch((err)=>{
                  console.log(err);
                  alert("Server could not process your request");
                });
              } catch(error) {
                console.log(error);
                alert("Invalid Syntax");
              }
            }}
            label="Export To Excel"
            title="Export to Excel"
          />

          <GraphiQL.Button
            onClick={ (e ) => {
              const editor = this.graphiql.getQueryEditor();
              const currentText = editor.getValue();
              const { parse, print } = require('graphql');
              try{
                const prettyText = print(parse(currentText));
                fetch(process.env.REACT_APP_GRAPHQL + '/exportToCSV', { //http://graphql:9000/
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({code: prettyText})
                })
                .then(async response => ({
                  fileName: response.headers.get('content-disposition').split('filename=')[1],
                  blob: await response.blob()
                }))
                .then(({ fileName, blob }) => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  document.body.appendChild(a);
                  a.style = "display: none";
                  a.href = url;
                  a.download = fileName;
                  a.click();
                  window.URL.revokeObjectURL(url);
                })
                .catch((err)=>{
                  console.log(err);
                  alert("Server could not process your request");
                });
              } catch(error) {
                console.log(error);
                alert("Invalid Syntax");
              }
            }}
            label="Export To CSV"
            title="Export to CSV"
          />

        </GraphiQL.Toolbar>

      </GraphiQL>
    );
  }
}

export default App;
