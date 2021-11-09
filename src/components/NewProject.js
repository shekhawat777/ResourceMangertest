import React from 'react'
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
import { ProjectValidationSchema } from 'src/reusable/validationModel';
import { Link, useHistory } from 'react-router-dom';
import apiService from 'src/reusable/Api';
import moment from 'moment';

const NewProject = () => {
    const history = useHistory()

    const initialValues = {
        project_name: '',
        project_description: '',
        project_start_date: '',
    }


    const onFormSubmit = async (values, { resetForm }) => {
        let data = {
            ...values,
            project_start_date: moment(values.project_start_date).format("D-MMMM-yyyy")
        }
        apiService('POST', '/projects', data)
            .then((res) => {
                resetForm()
                history.push('/projects')
            })
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Add Project
                        </CCardHeader>
                        <CCardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onFormSubmit}
                                validationSchema={ProjectValidationSchema}
                            >
                                {formik => (
                                    <CForm id="form" onSubmit={formik.handleSubmit}>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="project_name">Name</CLabel>
                                                    <CInput autoComplete="nope" id="project_name"  {...formik.getFieldProps('project_name')} />
                                                    <ErrorMessage name="project_name" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="project_description">Description</CLabel>
                                                    <CTextarea autoComplete="nope" id="project_description" name="project_description" {...formik.getFieldProps('project_description')} />
                                                    <ErrorMessage name="project_description" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="project_start_date">Start Date</CLabel>
                                                    <CInput type="date" autoComplete="nope" id="project_start_date" name="project_start_date" {...formik.getFieldProps('project_start_date')} />
                                                    <ErrorMessage name="project_start_date" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>

                                        </CFormGroup>
                                        <CButton id="button" type="submit" color="primary">Submit</CButton>{" "}
                                        <Link to="/projects"><CButton color="info" variant="outline">Cancel</CButton></Link>
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

export default NewProject
