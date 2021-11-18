import React from "react";
import apiService from "src/reusable/Api";
import { useHistory } from "react-router-dom";
import moment from "moment";

const NewManageItem = () => {
  const history = useHistory();
  const initialValues = {
    item_name: "",
    item_description: "",
    item_type: "",
    cost: "",
  };

  const onFormSubmit = async (values, { resetForm }) => {
    let data = {
      ...values,
      added_date: moment(Date.now()).format("D-MMMM-yyyy"),
    };
    apiService("POST", "/items", data).then((res) => {
      resetForm();
      history.push("/items");
    });
  };
  return <>write Add Item</>;
};

export default NewManageItem;
