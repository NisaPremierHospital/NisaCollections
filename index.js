// const { ApolloServer, gql } = require('apollo-server');
// const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const app = express();
var config = require('./config');
// const { typeDefs, resolvers } = require('./schema');
var  MongoClient = require('mongodb').MongoClient;
// var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const path = require("path");

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
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    "/graphql",
    expressGraphql({
      schema: executableSchema,
      graphiql: true,
      rootValue: root
    })
  );

app.get('/collection', (req, res) => res.render('index', { title: 'Hey', message: 'Hello there!' }))

app.use(express.static(path.join(__dirname, 'frontdesk/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontdesk/build', 'index.html'));
});

// server.applyMiddleware({ app }); // app is from an existing express app

//Excel
var EasyExcelExporter = require('easy-excel-exporter');

//ApolloClient
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import 'cross-fetch/polyfill';


app.post('/exportToExcel', (req, res) => {
    // console.log(req.body);
    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql"
    }).query({
        query: gql`
        ${req.body.code}
        `
      }).then( (result) => { 
          const options = {
            sheetName : 'Nisa Collections', // String value for assigning your own Sheet Name.
            fileName  : 'nisa-collection-reports', // String value for assigning a name for the Excel file created.
            autoCast  : false, // Boolean value that will indicate whether to type cast values for cells or not(Default : false).
            path : __dirname + '/storage' // String value to define your own storage path where the excel file will be saved.
          }
          var excelAdapter  = EasyExcelExporter(options);
          if(result && result.data && result.data.allNisaCollections && 
                result.data.allNisaCollections && result.data.allNisaCollections.NisaCollections && 
                !result.data.allNisaCollections.NisaCollections.length){
              return res.status(400).send("Not Ok");
          }
          const data = result.data.allNisaCollections.NisaCollections
          let excelHeaders = Object.keys(data[0]).map( (item, index, array) => {
                // return {columnName: item, dataType: EasyExcelExporter.dataType.String};
                let tokens = item.split('_');
                if(tokens.length === 2 && tokens[1] === '_'){
                    return {columnName: '', dataType: EasyExcelExporter.dataType.String};
                }else if(tokens[0] === '_'){
                    return {columnName: tokens[1].trim().toUpperCase(), dataType: EasyExcelExporter.dataType.String };
                }else{
                    return {columnName: tokens.join(' ').trim().toUpperCase(), dataType: EasyExcelExporter.dataType.String};
                }
            });
        let rows = data.map( (item, index, array) => {
            let row = {}, fields = Object.keys(item);
            for(let i = 0; i < fields.length; i++){
                row[excelHeaders[i].columnName] = item[fields[i]];
            }
            return row;
        })
        //  console.log({excelHeaders}, {options}, JSON.stringify(rows));
          excelAdapter.createColumns(excelHeaders);
          excelAdapter.addObjects(rows);
          let promise = excelAdapter.downloadFile();
          promise.then((stream)=>{
            res.writeHead(200, {
            'Content-Disposition': `attachment;filename=${options.fileName}.xlsx`,
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Access-Control-Expose-Headers': 'Content-Disposition' 
            });
            stream.pipe(res);
          }).catch((err)=>{
              res.status(400).send("Failure generating the file");
          })
    }).catch( (err) => {
        console.log(err)
        res.status(400).send(err);
    });
});

app.get('/exportToExcelSandbox', (req, res) => {
    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql"
    }).query({
        query: gql`
        {
            allNisaCollections(report_type: "lab", LIMIT: 500, SKIP: 0) {
              NisaCollections {
                _id
                emr_id
                patient_first_name
                patient_last_name
                provider_or_scheme
                report_type
                labtests_config_name
                lab_result_id
                lab_result_data_value
                lab_template_data_label
              }
            }
          }
        `
      }).then( (result) => { 
          const options = {
            sheetName : 'Nisa Collections', // String value for assigning your own Sheet Name.
            fileName  : 'nisa-collection-reports', // String value for assigning a name for the Excel file created.
            autoCast  : false, // Boolean value that will indicate whether to type cast values for cells or not(Default : false).
            path : __dirname + '/storage' // String value to define your own storage path where the excel file will be saved.
          }
          var excelAdapter  = EasyExcelExporter(options);
          if(result && result.data && result.data.allNisaCollections && 
                result.data.allNisaCollections && result.data.allNisaCollections.NisaCollections && 
                !result.data.allNisaCollections.NisaCollections.length){
              return res.send("Not Ok");
          }
          const data = result.data.allNisaCollections.NisaCollections
          let excelHeaders = Object.keys(data[0]).map( (item, index, array) => {
                // return {columnName: item, dataType: EasyExcelExporter.dataType.String};
                let tokens = item.split('_');
                if(tokens.length === 2 && tokens[1] === '_'){
                    return {columnName: '', dataType: EasyExcelExporter.dataType.String};
                }else if(tokens[0] === '_'){
                    return {columnName: tokens[1].trim().toUpperCase(), dataType: EasyExcelExporter.dataType.String };
                }else{
                    return {columnName: tokens.join(' ').trim().toUpperCase(), dataType: EasyExcelExporter.dataType.String};
                }
            });
        let rows = data.map( (item, index, array) => {
            let row = {}, fields = Object.keys(item);
            for(let i = 0; i < fields.length; i++){
                row[excelHeaders[i].columnName] = item[fields[i]];
            }
            return row;
        })
        //  console.log({excelHeaders}, {options}, JSON.stringify(rows));
          excelAdapter.createColumns(excelHeaders);
          excelAdapter.addObjects(rows);
          let promise = excelAdapter.downloadFile();
          promise.then((stream)=>{
            res.writeHead(200, {
            'Content-Disposition': `attachment;filename=${options.fileName}.xlsx`,
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            stream.pipe(res);
          }).catch((err)=>{
              res.status(400).send("Failure generating the file");
          })
    }).catch( (err) => {
        console.log(err)
        res.status(400).send(err);
    });
});

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000/`)
)

//console.log(`Server ready at http://localhost:4000/${server.graphqlPath}`)