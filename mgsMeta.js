import { dataTypes } from "mongo-graphql-starter";
const {
  MongoIdType,
  MongoIdArrayType,
  StringType,
  StringArrayType,
  BoolType,
  IntType,
  IntArrayType,
  FloatType,
  FloatArrayType,
  DateType,
  arrayOf,
  objectOf,
  formattedDate,
  JSONType,
  typeLiteral
} = dataTypes;

const NisaCollection = {
  fields: {
    emr_id: IntType,
    record_type: StringType,
    patient_last_name: StringType,
    patient_middle_name: StringType,
    patient_legacy_number: StringType,
    date_of_birth: StringType,
    phone_number: StringType,
    sex: StringType,
    patient_title: StringType,
    provider_or_scheme: StringType,
    patient_email: StringType,
    patient_nationality: StringType,
    patient_occupation: StringType,
    patient_work_address: StringType,
    patient_address: StringType,
    lab_template_data_label: StringType,
  }
};

export default {
  NisaCollection
};