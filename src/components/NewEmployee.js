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
} from '@coreui/react'

import { Formik, ErrorMessage } from "formik";
import ErrorLable from '../reusable/ErrorLable';
import { EmployeeValidationSchema } from 'src/reusable/validationModel';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'
const NewEmployee = () => {
    const history = useHistory()

    const initialValues = {
        employee_name: '',
        employee_email: '',
        employee_mobile: '',
        employee_project: '',
        employee_birth_date: '',
        employee_added_date: '',
    }


    const onFormSubmit = async (values, { resetForm }) => {
        let data = {
            ...values,
            employee_birth_date: moment(values.employee_birth_date).format("D-MMMM-yyyy"),
            employee_added_date: moment(values.employee_added_date).format("D-MMMM-yyyy")
        }
        apiService('POST', '/employees', data)
            .then((res) => {
                resetForm()
                history.push('/users')
            })
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Add User
                        </CCardHeader>
                        <CCardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onFormSubmit}
                                validationSchema={EmployeeValidationSchema}
                            >
                                {formik => (
                                    <CForm id="form" onSubmit={formik.handleSubmit}>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="employee_name">Name</CLabel>
                                                    <CInput autoComplete="nope" id="employee_name"  {...formik.getFieldProps('employee_name')} />
                                                    <ErrorMessage name="employee_name" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="employee_email">Email</CLabel>
                                                    <CInput autoComplete="nope" id="employee_email" name="employee_email" {...formik.getFieldProps('employee_email')} />
                                                    <ErrorMessage name="employee_email" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="employee_mobile">Mobile</CLabel>
                                                    <CInput autoComplete="nope" id="employee_mobile" name="employee_mobile" {...formik.getFieldProps('employee_mobile')} />
                                                    <ErrorMessage name="employee_mobile" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="employee_project">Project</CLabel>
                                                    <CInput autoComplete="nope" id="employee_project" name="employee_project" {...formik.getFieldProps('employee_project')} />
                                                    <ErrorMessage name="employee_project" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="employee_birth_date">Birth Date</CLabel>
                                                    <CInput type="date" autoComplete="nope" id="employee_birth_date" name="employee_birth_date" {...formik.getFieldProps('employee_birth_date')} />
                                                    <ErrorMessage name="employee_birth_date" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="employee_added_date">Joining Date</CLabel>
                                                    <CInput type="date" autoComplete="nope" id="employee_added_date" name="employee_added_date" {...formik.getFieldProps('employee_added_date')} />
                                                    <ErrorMessage name="employee_added_date" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CButton id="button" type="submit" color="primary">Submit</CButton>{" "}
                                        <Link to="/users"><CButton color="info" variant="outline">Cancel</CButton></Link>
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

export default NewEmployee
