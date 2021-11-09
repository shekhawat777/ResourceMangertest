import React from "react";
import { render, screen } from "@testing-library/react";
import {
    getAllCells,
    getAllRows,
    getByRowgroupType,
    queryByRowgroupType,
    getAllRowsByRowgroupType
} from 'testing-library-table-queries'
import apiService from "../reusable/Api";
import { BrowserRouter } from "react-router-dom";
import EmployeeListView from '../components/EmployeeListView';

let testName = "Employee boundary"

const data = [{
    employee_name: 'Harshit Kishor',
    employee_email: 'harshit@gmail.com',
    employee_mobile: '9696969696',
    employee_project: 'Test Management',
    employee_birth_date: '01/01/1990',
    employee_added_date: '01/01/2021',
}]
const fields = ['employee_id', 'employee_name', "Email", "Mobile", "Project", "Birth Date", "Assigned Date", 'Remove']

const setup = () => {
    const utils = render(
        <BrowserRouter>
            <EmployeeListView data={data} fields={fields} />
        </BrowserRouter>
    )
    const rows = getAllRows(utils.container)
    const cells = getAllCells(utils.container)
    const header = getByRowgroupType(utils.container, 'thead')
    const footer = queryByRowgroupType(utils.container, 'tfoot')
    const tBodyRow = getAllRowsByRowgroupType(utils.container, 'tbody')
    return {
        rows, cells, header, footer, tBodyRow, utils
    }
}
describe("boundary", () => {
    const { rows, header, footer, tBodyRow, utils } = setup()

    test(`${testName} should be rendered`, async () => {
        expect(await utils.findByText(/Manage Employee/i)).toBeTruthy();
    })

    test(`${testName} should have header`, async () => {
        expect(header).toBeTruthy();
    })

    test(`${testName} should not have footer`, async () => {
        expect(footer).toBeFalsy();
    })

})


let exceptionTest = "Employee exception"
describe('exception', () => {
    test(exceptionTest + ' should be check employeeList Api', async () => {
        await apiService('GET', '/employees', null)
            .then((res) => {
                expect(res.data).toEqual(res.data);
                expect(res.data).toBe(res.data);
                expect(res.data).not.toBe(null);
                expect(null).toBeNull();
                expect(res.data).toBeTruthy();
            })
    })
})
