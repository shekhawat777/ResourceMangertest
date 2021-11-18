import React from "react";
import { useHistory } from "react-router-dom";
import apiService from "src/reusable/Api";
import moment from "moment";

const NewProject = () => {
  const history = useHistory();

  const initialValues = {
    project_name: "",
    project_description: "",
    project_start_date: "",
  };

  const onFormSubmit = async (values, { resetForm }) => {
    let data = {
      ...values,
      project_start_date: moment(values.project_start_date).format(
        "D-MMMM-yyyy"
      ),
    };
    apiService("POST", "/projects", data).then((res) => {
      resetForm();
      history.push("/projects");
    });
  };
  return <>write Add Project</>;
};

export default NewProject;
