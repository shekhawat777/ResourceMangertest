
import * as Yup from "yup";

export const AllocationValidationSchema = Yup.object({
    allocated_to: Yup.string().required("Allocated to required."),
    item: Yup.string().required("Item required."),
    item_description: Yup.string().required("Item description required."),
    project: Yup.string().required("Project required."),
    allocation_date: Yup.string().required("Allocation date required."),
    po_no: Yup.string().required("PO No required."),
    po_amount: Yup.string().required("PO Amount required."),
    start_date: Yup.string().required("Start Date required."),
    end_date: Yup.string().required("End Date required."),
})

export const ItemValidationSchema = Yup.object({
    item_name: Yup.string().required("Item Name to required."),
    item_description: Yup.string().required("Item description required."),
    item_type: Yup.string().required("Item type required."),
    cost: Yup.string().required("Cost required."),
})

export const ProjectValidationSchema = Yup.object({
    project_name: Yup.string().required("Project Name to required."),
    project_description: Yup.string().required("Project description required."),
    project_start_date: Yup.string().required("Project Start date required."),
})

export const EmployeeValidationSchema = Yup.object({
    employee_name: Yup.string().required("Employee name required."),
    employee_email: Yup.string().required("Employee email required.").email("Invalid email"),
    employee_mobile: Yup.string().required("Employee mobile required."),
    employee_project: Yup.string().required("Employee project required."),
    employee_birth_date: Yup.string().required("Employee birth date required."),
    employee_added_date: Yup.string().required("Employee joining date required."),
})