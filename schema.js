const { gql } = require('apollo-server-express');

async function rawQuery(db, args) {
    const collection = await db.collection('nisa_collection');
    const cursor = await collection.find({});
    // return [{id: '1', sex: "male"}];
    const result = await cursor.toArray();
    return result;
}

async function query(model, args) {
    const result = await model.find({}).lean().exec();
    return result;
}

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    nisa (
        emr_id: Int
        record_type: String
        patient_last_name: String,
        patient_middle_name: String,
        patient_legacy_number: String,
        date_of_birth: String,
        phone_number: String,
        sex: String,
        patient_title: String,
        provider_or_scheme: String,
        patient_email: String,
        patient_nationality: String,
        patient_occupation: String,
        patient_work_address: String,
        patient_address: String,
        lab_template_data_label: String,
    ): [records]
  }
  type records {
        emr_id: Int
        record_type: String
        patient_last_name: String,
        patient_middle_name: String,
        patient_legacy_number: String,
        date_of_birth: String,
        phone_number: String,
        sex: String,
        patient_title: String,
        provider_or_scheme: String,
        patient_email: String,
        patient_nationality: String,
        patient_occupation: String,
        patient_work_address: String,
        patient_address: String,
        lab_template_data_label: String,
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    nisa: (root, args, context, info) => {
        // return rawQuery(context.deb, args);
        return query(context.model, args);
    }
  }
};

module.exports = {resolvers, typeDefs}