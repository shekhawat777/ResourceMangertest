import React from "react";
import apiService from "src/reusable/Api";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
const NewEmployee = () => {
  const history = useHistory();

  const initialValues = {
    employee_name: "",
    employee_email: "",
    employee_mobile: "",
    employee_project: "",
    employee_birth_date: "",
    employee_added_date: "",
  };

  const onFormSubmit = async (values, { resetForm }) => {
    let data = {
      ...values,
      employee_birth_date: moment(values.employee_birth_date).format(
        "D-MMMM-yyyy"
      ),
      employee_added_date: moment(values.employee_added_date).format(
        "D-MMMM-yyyy"
      ),
    };
    apiService("POST", "/employees", data).then((res) => {
      resetForm();
      history.push("/users");
    });
  };
  return <>Add User</>;
};

export default NewEmployee;
