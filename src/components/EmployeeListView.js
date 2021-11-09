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
const EmployeeListView = ({ data, fields }) => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        Manage Employee
                        <CButton color="primary" className="px-2 mx-2" style={{ float: "right" }}>Export</CButton>
                        <Link to="/users/create">
                            <CButton color="primary" className="px-2" style={{ float: "right" }}>New User</CButton>
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
                                "employee_id": (item) => (
                                    <td>
                                        {item.id}
                                    </td>
                                ),
                                'Project': (item) => (
                                    <td>
                                        {item.employee_project}
                                    </td>
                                ),
                                'Email': (item) => (
                                    <td>
                                        {item.employee_email}
                                    </td>
                                ),
                                'Mobile': (item) => (
                                    <td>
                                        {item.employee_mobile}
                                    </td>
                                ),
                                'Birth Date': (item) => (
                                    <td>
                                        {item.employee_birth_date}
                                    </td>
                                ),
                                'Assigned Date': (item) => (
                                    <td>
                                        {item.employee_added_date}
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

export default EmployeeListView
