import React from 'react'
import apiService from 'src/reusable/Api';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
    CTextarea,
} from '@coreui/react'

import { Formik, ErrorMessage } from "formik";
import ErrorLable from '../reusable/ErrorLable';
import { AllocationValidationSchema } from 'src/reusable/validationModel';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const NewAllocation = () => {

    const history = useHistory()
    const initialValues = {
        allocated_to: '',
        item: '',
        item_description: '',
        project: '',
        allocation_date: '',
        po_no: '',
        po_amount: '',
        start_date: '',
        end_date: '',
    }


    const onFormSubmit = async (values, { resetForm }) => {
        let data = {
            ...values,
            allocation_date: moment(values.allocation_date).format("D-MMMM-yyyy"),
            start_date: moment(values.start_date).format("D-MMMM-yyyy"),
            end_date: moment(values.end_date).format("D-MMMM-yyyy"),
        }
        apiService('POST', '/allocations', data)
            .then((res) => {
                resetForm()
                history.push('/allocations')
            })
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Add Allocation
                        </CCardHeader>
                        <CCardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onFormSubmit}
                                validationSchema={AllocationValidationSchema}
                            >
                                {formik => (
                                    <CForm id="form" onSubmit={formik.handleSubmit}>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="allocated_to">Allocated To</CLabel>
                                                    <CInput autoComplete="nope" id="allocated_to"  {...formik.getFieldProps('allocated_to')} />
                                                    <ErrorMessage name="allocated_to" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="item">Item</CLabel>
                                                    <CInput autoComplete="nope" id="item" name="item" {...formik.getFieldProps('item')} />
                                                    <ErrorMessage name="item" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="item_description">Description</CLabel>
                                                    <CTextarea autoComplete="nope" id="item_description" name="item_description" {...formik.getFieldProps('item_description')} />
                                                    <ErrorMessage name="item_description" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="project">Project</CLabel>
                                                    <CInput autoComplete="nope" id="project" name="project" {...formik.getFieldProps('project')} />
                                                    <ErrorMessage name="project" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="po_no">PO Number</CLabel>
                                                    <CInput id="po_no" name="po_no" {...formik.getFieldProps('po_no')} />
                                                    <ErrorMessage name="po_no" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="po_amount">PO Amount</CLabel>
                                                    <CInput id="po_amount" name="po_amount" {...formik.getFieldProps('po_amount')} />
                                                    <ErrorMessage name="po_amount" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="start_date">Start Date</CLabel>
                                                    <CInput type='date' id="start_date" name="start_date" {...formik.getFieldProps('start_date')} />
                                                    <ErrorMessage name="start_date" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="end_date">End Date</CLabel>
                                                    <CInput type='date' id="end_date" name="end_date" {...formik.getFieldProps('end_date')} />
                                                    <ErrorMessage name="end_date" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="allocation_date">Allocation Date</CLabel>
                                                    <CInput type='date' id="allocation_date" name="allocation_date" {...formik.getFieldProps('allocation_date')} />
                                                    <ErrorMessage name="allocation_date" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>

                                        <CButton id="button" type="submit" color="primary">Submit</CButton>{" "}
                                        <Link to="/allocations"><CButton color="info" variant="outline">Cancel</CButton></Link>
                                    </CForm>
                                )}
                            </Formik>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow >
        </>
    )
}

export default NewAllocation
