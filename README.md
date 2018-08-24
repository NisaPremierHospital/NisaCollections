## Getting Started
Update the schema here ./mgsSetup.js
run..
```sh
rm -R graphQL
npm run build
npm start
```

## Increase Performance 

### Keys To Index
```sh
db.nisa_collection.createIndex({emr_id: -1})
db.nisa_collection.createIndex({patient_first_name: -1})
db.nisa_collection.createIndex({patient_last_name: -1})
db.nisa_collection.createIndex({patient_middle_name: -1})
db.nisa_collection.createIndex({patient_legacy_number: -1})
db.nisa_collection.createIndex({date_of_birth: -1})
db.nisa_collection.createIndex({sex: -1})
//
db.nisa_collection.createIndex({provider_or_scheme: -1})
db.nisa_collection.createIndex({patient_email: -1})
//
db.nisa_collection.createIndex({record_date: -1})
db.nisa_collection.createIndex({report_type: -1})
db.nisa_collection.createIndex({encounter_id: -1})
db.nisa_collection.createIndex({service_center: -1});
db.nisa_collection.createIndex({theatre_id: -1});
//
db.nisa_collection.createIndex({lab_template_data_label: -1});
db.nisa_collection.createIndex({lab_result_data_value: -1});
db.nisa_collection.createIndex({lab_result_id: -1});
db.nisa_collection.createIndex({lab_template_id: -1});
db.nisa_collection.createIndex({lab__patient_labs_test_id: -1})
db.nisa_collection.createIndex({lab__patient_labs_status: -1})
db.nisa_collection.createIndex({labtests_config_name: -1});
//
db.nisa_collection.createIndex({regimen_drug_name: -1})
db.nisa_collection.createIndex({regimen_drug_generic_name: -1})
db.nisa_collection.createIndex({regimen_form: -1})
db.nisa_collection.createIndex({regimen_status: -1})
db.nisa_collection.createIndex({regimen_prescribed_by: -1})
//
db.nisa_collection.createIndex({radiology_scan_name: -1});
db.nisa_collection.createIndex({radiology_status: -1});
db.nisa_collection.createIndex({radiology_cancelled: -1});
db.nisa_collection.createIndex({radiology_is_approved: 1});
//
db.nisa_collection.createIndex({patient_diagnoses_diag_type: -1});
db.nisa_collection.createIndex({patient_diagnoses_severity: -1});
db.nisa_collection.createIndex({patient_diagnoses_diagnosis: -1});
db.nisa_collection.createIndex({patient_diagnoses_status: -1});
db.nisa_collection.createIndex({diagnoses_id: -1});
db.nisa_collection.createIndex({diagnoses_code: -1});
db.nisa_collection.createIndex({diagnoses_case: -1});
//
db.nisa_collection.createIndex({procedure_name: -1});
db.nisa_collection.createIndex({procedure_id: -1});
db.nisa_collection.createIndex({patient_procedure_note_type: -1});
db.nisa_collection.createIndex({patient_procedure_status: 1});
//
db.nisa_collection.createIndex({consultation_note_type: -1});
db.nisa_collection.createIndex({consultation_doctors_name: -1});
//
db.nisa_collection.createIndex({patient_procedure_nursing_service: -1});
db.nisa_collection.createIndex({patient_procedure_nursing_task_id: -1});
//
db.nisa_collection.createIndex({vital_sign_type: -1});
db.nisa_collection.createIndex({vital_sign_value: -1});
```
## Error Correction

### All (Do it until there's no record left)
```sh
db.nisa_collection.find({record_date: { $eq: null}}).limit(100000).snapshot().forEach(function (e) {
    e.record_date = new Date(e.creation_date); 
    db.nisa_collection.save(e); 
});
```

## UI
```sh
 browserify codemirror.js -o public/bundle.js -t [ babelify --presets [ "@babel/preset-env"] ]
```


