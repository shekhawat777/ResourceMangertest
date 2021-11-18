import React from "react";
import apiService from "src/reusable/Api";
import { useHistory } from "react-router-dom";
import moment from "moment";

const NewAllocation = () => {
  const history = useHistory();
  const initialValues = {
    allocated_to: "",
    item: "",
    item_description: "",
    project: "",
    allocation_date: "",
    po_no: "",
    po_amount: "",
    start_date: "",
    end_date: "",
  };

  const onFormSubmit = async (values, { resetForm }) => {
    let data = {
      ...values,
      allocation_date: moment(values.allocation_date).format("D-MMMM-yyyy"),
      start_date: moment(values.start_date).format("D-MMMM-yyyy"),
      end_date: moment(values.end_date).format("D-MMMM-yyyy"),
    };
    apiService("POST", "/allocations", data).then((res) => {
      resetForm();
      history.push("/allocations");
    });
  };
  return <>write Add Allocation</>;
};

export default NewAllocation;
