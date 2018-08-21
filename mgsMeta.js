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
  table: "nisa_collection",
  fields: {
    emr_id: IntType,
    patient_first_name: StringType,
    patient_last_name: StringType,
    patient_middle_name: StringType,
    patient_legacy_number: StringType,
    date_of_birth: StringType,
    phone_number: StringType,
    sex: StringType, //index
    patient_title: StringType,
    provider_or_scheme: StringType, //index
    patient_email: StringType,
    patient_nationality: IntType,
    patient_occupation: StringType,
    patient_work_address: StringType,
    patient_address: StringType,
    patient_is_deceased: BoolType,
    patient_is_active: BoolType,

    creation_date: StringType, //index
    record_date: DateType, //Strict
    report_type: StringType, //index
    encounter_id: IntType,
    service_center: StringType, //index
    hospital_id: IntType,
    referral_id: StringType,//IntType,
    theatre_id: StringType, //IntType,
    surgeon_id: StringType, //IntType,
    bodypart_id: StringType, //IntType,
    anesthesiologist_id: StringType, //IntType,

    //LAB
    lab_template_data_label: StringType, //index
    lab_result_data_value: StringType,
    lab_template_data_lab_method_id: IntType,
    lab_template_data_reference: StringType,
    lab_template_data_lab_template_id: IntType,
    lab_result_id: IntType,
    lab_template_id: IntType,
    lab_result_patient_lab_id: IntType,
    lab_result_approved: BoolType,
    lab_result_abnormal_lab_value: IntType,
    lab_result_approved_by: StringType,
    lab_result_approved_date: StringType, //DateType
    lab__patient_labs_patient_id: IntType, //emr_id ?
    lab__patient_labs_test_id: IntType,
    lab__patient_labs_specimen_date: StringType, //DateType
    lab__patient_labs_lab_group_id: StringType,
    lab__patient_labs_test_date: StringType, //DateType
    lab__patient_labs_test_notes: StringType,
    lab__patient_labs_status: StringType,
    labtests_config_name: StringType, //index

    //PHARM
    regimen_drug_name: StringType,
    regimen_drug_generic_name: StringType,
    regimen_description: StringType,
    regimen_weight: StringType,
    regimen_form: StringType,
    regimen_drug_id: IntType,
    regimen_quantity: IntType,
    regimen_request_time: StringType, //DateType
    regimen_filled_time: StringType, //DateType
    regimen_completed_time: StringType, //DateType
    regimen_status: StringType,
    regimen_prescribed_by: StringType,
    regimen_note: StringType,
    regimen_refill_off: StringType,
    regimen_requested_by: StringType,

    //radiology
    radiology_scan_name: StringType, //index
    radiology_request_note: StringType,
    radiology_request_date: StringType, //DateType
    radiology_is_approved: BoolType,
    radiology_approved_date: StringType, //DateType
    radiology_status: BoolType,
    radiology_cancelled: BoolType,
    radio_cancel_date: StringType, //DateType

    //Diagnosis
    patient_diagnoses_date_of_entry: StringType, //DateType
    patient_diagnoses_diag_type: StringType,
    patient_diagnoses_active: BoolType,
    patient_diagnoses_severity: StringType,
    patient_diagnoses_diagnosisNote: StringType,
    patient_diagnoses_diagnosis: StringType, //
    patient_diagnoses_status: StringType,
    diagnoses_id: IntType,
    diagnoses_code: StringType, //
    diagnoses_type: StringType,
    diagnoses_case: StringType,
    diagnoses_parent_id: StringType,
    diagnoses_oi: IntType,

    //ProcedureNote
    procedure_id: IntType,
    procedure_name: StringType,
    procedure_icd_code: StringType,
    procedure_description: StringType,
    patient_procedure_id: IntType,
    patient_procedure_request_note: StringType,
    patient_procedure_closing_text: StringType,
    scheduled_on: StringType,
    scheduled_by: StringType,
    patient_procedure_time_started: StringType, //DateType
    patient_procedure_time_start: StringType, //DateType
    patient_procedure_time_stop: StringType, //DateType
    patient_procedure_requested_by: StringType,
    patient_procedure_note: StringType,
    patient_procedure_note_time: StringType, //DateType
    patient_procedure_note_type: StringType,
    patient_procedure_request_date: StringType,
    patient_procedure_status: StringType,

    //Patient Visit Notes
    consultation_date_of_entry: StringType, //DateType
    consultation_diagnoses: StringType,
    consultation_note_type: StringType,
    consultation_reason: StringType,
    consultation_doctors_name: StringType,

    //Nursing Task
    patient_procedure_nursing_task_id: StringType, //IntType
    patient_procedure_nursing_service: StringType,

    //Vitals
    vital_sign_type: StringType, //index
    vital_sign_value: StringType, //FloatType
    vital_sign_unit: StringType,
    vital_sign_min_val: StringType, //FloatType
    vital_sign_read_date: StringType //DateType
  }
};

export default {
  NisaCollection
};