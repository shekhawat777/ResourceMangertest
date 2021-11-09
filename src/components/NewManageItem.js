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
import { ItemValidationSchema } from 'src/reusable/validationModel';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const NewManageItem = () => {

    const history = useHistory()
    const initialValues = {
        item_name: '',
        item_description: '',
        item_type: '',
        cost: '',
    }


    const onFormSubmit = async (values, { resetForm }) => {
        let data = {
            ...values,
            added_date: moment(Date.now()).format("D-MMMM-yyyy"),
        }
        apiService('POST', '/items', data)
            .then((res) => {
                resetForm()
                history.push('/items')
            })
    }
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Add Item
                        </CCardHeader>
                        <CCardBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={onFormSubmit}
                                validationSchema={ItemValidationSchema}
                            >
                                {formik => (
                                    <CForm id="form" onSubmit={formik.handleSubmit}>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="item_name">Name</CLabel>
                                                    <CInput autoComplete="nope" id="item_name"  {...formik.getFieldProps('item_name')} />
                                                    <ErrorMessage name="item_name" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel htmlFor="item_type">Type</CLabel>
                                                    <CInput autoComplete="nope" id="item_type" name="item_type" {...formik.getFieldProps('item_type')} />
                                                    <ErrorMessage name="item_type" render={msg => <ErrorLable msg={msg} />} />
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
                                                    <CLabel htmlFor="cost">Cost</CLabel>
                                                    <CInput autoComplete="nope" id="cost" name="cost" {...formik.getFieldProps('cost')} />
                                                    <ErrorMessage name="cost" render={msg => <ErrorLable msg={msg} />} />
                                                </CFormGroup>
                                            </CCol>
                                        </CFormGroup>
                                        <CButton id="button" type="submit" color="primary">Submit</CButton>{" "}
                                        <Link to="/items"><CButton color="info" variant="outline">Cancel</CButton></Link>
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

export default NewManageItem
