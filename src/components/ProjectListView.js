import React from 'react'
import { Link } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
} from "@coreui/react";



const ProjectListView = ({ fields, data }) => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Manage Project
                        <CButton color="primary" className="px-2 mx-2" style={{ float: "right" }}>Export</CButton>
                        <Link to="/projects/create">
                            <CButton color="primary" className="px-2" style={{ float: "right" }}>New Project</CButton>
                        </Link>

                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            id='table'
                            items={data}
                            fields={fields}
                            tableFilter
                            sorter
                            itemsPerPageSelect={{
                                label: "Items per page:",
                                values: [10, 20, 30, 40, 50],
                            }}
                            hover
                            striped
                            itemsPerPage={10}
                            pagination
                            scopedSlots={{
                                'Name': (item) => (
                                    <td>
                                        {item.project_name}
                                    </td>
                                ),
                                'Description': (item) => (
                                    <td>
                                        {item.project_description}
                                    </td>
                                ),
                                'Remove': (item) => (
                                    <td>
                                        <CButton id="button" type="submit" color="secondary">Delete</CButton>
                                    </td>
                                )
                            }
                            }
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ProjectListView
