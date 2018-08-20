## Increase Performance 

### Keys To Index
db.nisa_collection.createIndex({vital_sign_type: -1});
db.nisa_collection.createIndex({sex: -1});
db.nisa_collection.createIndex({provider_or_scheme: -1});
db.nisa_collection.createIndex({report_type: -1});
db.nisa_collection.createIndex({service_center: -1});
db.nisa_collection.createIndex({lab_template_data_label: -1});
db.nisa_collection.createIndex({labtests_config_name: -1});
db.nisa_collection.createIndex({radiology_scan_name: -1});
db.nisa_collection.createIndex({patient_first_name: -1});
db.nisa_collection.createIndex({patient_last_name: -1});
db.nisa_collection.createIndex({record_date: 1});

## Error Correction

### Lab
db.nisa_collection.find({report_type: "lab"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.lab__patient_labs_specimen_date); 
    e.emr_id = e.lab__patient_labs_patient_id; 
    db.nisa_collection.save(e); 
});

### PatientDiagnosis
db.nisa_collection.find({report_type: "diagnosis"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.patient_diagnoses_date_of_entry); 
    db.nisa_collection.save(e); 
});

### PatientProcedureNote
db.nisa_collection.find({report_type: "procedure note"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.patient_procedure_request_date); 
    db.nisa_collection.save(e); 
});

### Regimens
db.nisa_collection.find({report_type: "pharmacy"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.regimen_request_time); 
    db.nisa_collection.save(e); 
});

### Scan
db.nisa_collection.find({report_type: "imaging"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.radiology_request_date); 
    db.nisa_collection.save(e); 
});

### Scan
db.nisa_collection.find({report_type: "consultation"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.consultation_date_of_entry); 
    db.nisa_collection.save(e); 
});

### Nursing Task
db.nisa_collection.find({report_type: "procedure nursing task"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.patient_procedure_request_date); 
    db.nisa_collection.save(e); 
});

### Vitals
db.nisa_collection.find({report_type: "vital sign"}).snapshot().forEach(function (e) {
    e.record_date = new Date(e.vital_sign_read_date); 
    db.nisa_collection.save(e); 
});



## UI
 browserify codemirror.js -o public/bundle.js -t [ babelify --presets [ "@babel/preset-env"] ]