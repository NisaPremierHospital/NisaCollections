const defaultQuery = `
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
export default defaultQuery