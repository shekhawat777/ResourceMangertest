import React from "react";
import { render } from "@testing-library/react";
import {
    getAllCells,
    getAllRows,
    getByRowgroupType,
    queryByRowgroupType,
    getAllRowsByRowgroupType
} from 'testing-library-table-queries'
import apiService from "../reusable/Api";
import { BrowserRouter } from "react-router-dom";
import AllocationListView from '../components/AllocationListView';

let testName = "Allocation boundary"

const data = []
const fields = ['allocation_id', 'allocated_to', 'item', 'project', 'allocation_date', 'po_no', 'po_amount', 'lifeTime']


const setup = () => {
    const utils = render(
        <BrowserRouter>
            <AllocationListView data={data} fields={fields} />
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
    const { header, footer, utils } = setup()

    test(`${testName} should be rendered`, async () => {
        expect(await utils.findByText(/All Allocations/i)).toBeTruthy();
    })

    test(`${testName} should have header`, async () => {
        expect(header).toBeTruthy();
    })

    test(`${testName} should not have footer`, async () => {
        expect(footer).toBeFalsy();
    })

})


let exceptionTest = "Allocation exception"
describe('exception', () => {
    test(exceptionTest + ' should be check allocationList Api', async () => {
        await apiService('GET', '/allocations', null)
            .then((res) => {
                expect(res.data).toEqual(res.data);
                expect(res.data).toBe(res.data);
                expect(res.data).not.toBe(null);
                expect(null).toBeNull();
                expect(res.data).toBeTruthy();
            })
    })
})
