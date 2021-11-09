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
import ItemListView from '../components/ItemListView';

let testName = "Item boundary"

const data = []
const fields = ['Name', 'item_description', 'item_type', 'Cost ($)', 'Remove']

const setup = () => {
    const utils = render(
        <BrowserRouter>
            <ItemListView data={data} fields={fields} />
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
        expect(await utils.findByText(/Manage Item/i)).toBeTruthy();
    })

    test(`${testName} should have header`, async () => {
        expect(header).toBeTruthy();
    })

    test(`${testName} should not have footer`, async () => {
        expect(footer).toBeFalsy();
    })

})


let exceptionTest = "Item exception"
describe('exception', () => {
    test(exceptionTest + ' should be check itemList Api', async () => {
        await apiService('GET', '/items', null)
            .then((res) => {
                expect(res.data).toEqual(res.data);
                expect(res.data).toBe(res.data);
                expect(res.data).not.toBe(null);
                expect(null).toBeNull();
                expect(res.data).toBeTruthy();
            })
    })
})
