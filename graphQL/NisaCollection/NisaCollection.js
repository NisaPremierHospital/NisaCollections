export default {
  table: "nisa_collection",
  typeName: "NisaCollection",
  fields: {
    _id: "MongoId",
    emr_id: "Int",
    patient_first_name: "String",
    patient_last_name: "String",
    patient_middle_name: "String",
    patient_legacy_number: "String",
    date_of_birth: "String",
    phone_number: "String",
    sex: "String",
    patient_title: "String",
    provider_or_scheme: "String",
    patient_email: "String",
    patient_nationality: "Int",
    patient_occupation: "String",
    patient_work_address: "String",
    patient_address: "String",
    patient_is_deceased: "Boolean",
    patient_is_active: "Boolean",
    record_date: {
      __isDate: true,
      format: "%m/%d/%Y"
    },
    record_type: "String",
    encounter_id: "Int",
    service_center: "String",
    hospital_id: "Int",
    referral_id: "String",
    theatre_id: "String",
    surgeon_id: "String",
    bodypart_id: "String",
    anesthesiologist_id: "String",
    lab_template_data_label: "String",
    lab_result_data_value: "String",
    lab_template_data_lab_method_id: "Int",
    lab_template_data_reference: "String",
    lab_template_data_lab_template_id: "Int",
    lab_result_id: "Int",
    lab_template_id: "Int",
    lab_result_patient_lab_id: "Int",
    lab_result_approved: "Boolean",
    lab_result_abnormal_lab_value: "Int",
    lab_result_approved_by: "String",
    lab_result_approved_date: "String",
    lab__patient_labs_patient_id: "Int",
    lab__patient_labs_test_id: "Int",
    lab__patient_labs_specimen_date: "String",
    lab__patient_labs_lab_group_id: "String",
    lab__patient_labs_test_date: "String",
    lab__patient_labs_test_notes: "String",
    lab__patient_labs_status: "String",
    labtests_config_name: "String",
    regimen_drug_name: "String",
    regimen_drug_generic_name: "String",
    regimen_description: "String",
    regimen_weight: "String",
    regimen_form: "String",
    regimen_drug_id: "Int",
    regimen_quantity: "Int",
    regimen_request_time: "String",
    regimen_filled_time: "String",
    regimen_completed_time: "String",
    regimen_status: "String",
    regimen_prescribed_by: "String",
    regimen_note: "String",
    regimen_refill_off: "String",
    regimen_requested_by: "String",
    radiology_scan_name: "String",
    radiology_request_note: "String",
    radiology_request_date: "String",
    radiology_is_approved: "Boolean",
    radiology_approved_date: "String",
    radiology_status: "Boolean",
    radiology_cancelled: "Boolean",
    radio_cancel_date: "String",
    patient_diagnoses_date_of_entry: "String",
    patient_diagnoses_diag_type: "String",
    patient_diagnoses_active: "Boolean",
    patient_diagnoses_severity: "String",
    patient_diagnoses_diagnosisNote: "String",
    patient_diagnoses_diagnosis: "String",
    patient_diagnoses_status: "String",
    diagnoses_id: "Int",
    diagnoses_code: "String",
    diagnoses_type: "String",
    diagnoses_case: "String",
    diagnoses_parent_id: "String",
    diagnoses_oi: "Int",
    procedure_id: "Int",
    procedure_name: "String",
    procedure_icd_code: "String",
    procedure_description: "String",
    patient_procedure_id: "Int",
    patient_procedure_request_note: "String",
    patient_procedure_closing_text: "String",
    scheduled_on: "String",
    scheduled_by: "String",
    patient_procedure_time_started: "String",
    patient_procedure_time_start: "String",
    patient_procedure_time_stop: "String",
    patient_procedure_requested_by: "String",
    patient_procedure_note: "String",
    patient_procedure_note_time: "String",
    patient_procedure_note_type: "String",
    patient_procedure_request_date: "String",
    patient_procedure_status: "String",
    consultation_date_of_entry: "String",
    consultation_diagnoses: "String",
    consultation_note_type: "String",
    consultation_reason: "String",
    consultation_doctors_name: "String",
    patient_procedure_nursing_task_id: "String",
    patient_procedure_nursing_service: "String",
    vital_sign_type: "String",
    vital_sign_value: "String",
    vital_sign_unit: "String",
    vital_sign_min_val: "String",
    vital_sign_read_date: "String"
  }
};