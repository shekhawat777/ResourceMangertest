import React, { useEffect, useState } from "react";
import ProjectListView from "src/components/ProjectListView";
import apiService from "src/reusable/Api";

const Project = () => {
  const [data, setData] = useState([]);
  const fields = ["Name", "Description", "Remove"];
  useEffect(() => {
    const fetchData = () => {
      apiService("GET", "/projects", null).then((res) => {
        setData(res.data);
      });
    };
    fetchData();
  }, []);

  return <ProjectListView data={data} fields={fields} />;
};

export default Project;
