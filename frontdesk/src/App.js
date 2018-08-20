import React, { Component } from 'react';
// import { ApolloProvider } from "react-apollo";
import logo from './logo.png';
import './App.css';
// import GraphiQL from 'graphiql';

import GraphiQL from './graphiql/src';

import fetch from 'isomorphic-fetch';

// import '../node_modules/graphiql/graphiql.css';

// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//   uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
// });

function graphQLFetcher(graphQLParams) {
  return fetch('http://graphql:9000/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
};



class App extends Component {

  handleClickExportButton(event) {
    const editor = this.graphiql.getQueryEditor();
    const currentText = editor.getValue();
    const { parse, print } = require('graphql');
    const prettyText = print(parse(currentText));
    console.log("ServerConsumer", prettyText);
  }

  componentDidMount(){
    // const editor = this.graphiql.getQueryEditor();
    let query = `
    # Welcome to GraphiQL
    #
    # GraphiQL is an in-browser tool for writing, validating, and
    # testing GraphQL queries.
    #
    # Type queries into this side of the screen, and you will see intelligent
    # typeaheads aware of the current GraphQL type schema and live syntax and
    # validation errors highlighted within the text.
    #
    # GraphQL queries typically start with a "{" character. Lines that starts
    # with a # are ignored.
    #
    # An example GraphQL query might look like:
    #
    #     {
    #       field(arg: "value") {
    #         subField
    #       }
    #     }
    #
    # Keyboard shortcuts:
    #
    #  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
    #
    #       Run Query:  Ctrl-Enter (or press the play button above)
    #
    #   Auto Complete:  Ctrl-Space (or just start typing)
    #
    `;
    console.log(query);
    // editor.setValue(query);
  }


  render() {
    return (
      <GraphiQL fetcher={graphQLFetcher}>
      <GraphiQL.Logo>
        <img src={logo} className="Nisa Premier" alt="logo" />
      </GraphiQL.Logo>
      
      <GraphiQL.Toolbar>

          <GraphiQL.Button
            onClick={this.handleClickExportButton}
            label="ExportToExcel"
            title="Export to Excel"
          />

        </GraphiQL.Toolbar>

      </GraphiQL>
    );
  }
}


export default App;
