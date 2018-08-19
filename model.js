var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const nisa_collection_schema = new Schema({
    emr_id: Number,
    record_type: String,
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
  });

  const nisa_collection = mongoose.model('nisa_collection', nisa_collection_schema);

  module.exports = nisa_collection;