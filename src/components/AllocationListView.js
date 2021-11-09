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
const AllocationListView = ({ fields, data }) => {
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        All Allocations
                        <CButton color="primary" className="px-2 mx-2" style={{ float: "right" }}>Export</CButton>
                        <Link to="/allocations/create">
                            <CButton color="primary" className="px-2" style={{ float: "right" }}>New Allocation</CButton>
                        </Link>{"  "}

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
                                'lifeTime': (item) => (
                                    <td>
                                        {item.start_date} to {item.end_date}
                                    </td>
                                ),
                                'allocation_id': (item) => (
                                    <td>
                                        {item.id}
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

export default AllocationListView
