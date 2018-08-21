const defaultQuery = `
# Possible report_type are:
# 1. lab
# 2. diagnosis
# 3. procedure note
# 4. pharmacy
# 5. imaging
# 6. consultation
# 7. procedure nursing task
# 8. vital sign
{
  allNisaCollections(
    report_type: "lab", 
    record_date_gt: "2017-01-01 00:00", 
    record_date_lt: "2017-01-31 23:59",  
    LIMIT: 10, 
    SKIP: 0) {
    NisaCollections {
      emr_id
      patient_first_name
      patient_last_name
      provider_or_scheme
      labtests_config_name
      lab_result_data_value
      lab_template_data_label
      lab_result_id
    }
  }
}`
export default defaultQuery