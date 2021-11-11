import React from 'react'
import { render, screen, fireEvent, act, queryByAttribute, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { checkRequired } from 'src/reusable/utils';
import apiService from '../reusable/Api';
import NewManageItem from '../components/NewManageItem';
import moment from 'moment';

const getById = queryByAttribute.bind(null, 'id');

const setup = () => {
    const utils = render(
        <BrowserRouter>
            <NewManageItem />
        </BrowserRouter>
    )
    const item_name = getById(utils.container, 'item_name');
    const item_description = getById(utils.container, 'item_description');
    const item_type = getById(utils.container, 'item_type');
    const cost = getById(utils.container, 'cost');
    const button = getById(utils.container, 'button');
    const form = getById(utils.container, 'form');
    return {
        item_name,
        item_description,
        item_type,
        cost,
        button,
        form,
        ...utils,
    }
}

let testName = "NewItem boundary"
/** ===========================Check All Validation for Input Fields========================= **/
describe('boundary', () => {

    test(testName + ' item_name is required', async () => {
        const { item_name } = setup()
        fireEvent.blur(item_name);
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' item_name is Valid', async () => {
        const { item_name } = setup()
        fireEvent.blur(item_name);
        act(() => {
            fireEvent.change(item_name, { target: { value: 'Amazon Web Services' } });
        });
        await waitFor(async () => {
            const Error = screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {

    test(testName + ' item_description is required', async () => {
        const { item_description } = setup()
        act(() => {
            fireEvent.blur(item_description);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' item_description is Valid', async () => {
        const { item_description } = setup()
        act(() => {
            fireEvent.blur(item_description);
            fireEvent.change(item_description, { target: { value: 'Cloud based server' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {

    test(testName + ' item_type is required', async () => {
        const { item_type } = setup()
        act(() => {
            fireEvent.blur(item_type);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' item_type is Valid', async () => {
        const { item_type } = setup()
        act(() => {
            fireEvent.blur(item_type);
            fireEvent.change(item_type, { target: { value: 'Software' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {
    test(testName + ' cost is required', async () => {
        const { cost } = setup()
        act(() => {
            fireEvent.blur(cost);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' cost is Valid', async () => {
        const { cost } = setup()
        act(() => {
            fireEvent.blur(cost);
            fireEvent.change(cost, { target: { value: '123' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});
/** ===========================End========================= **/

/* ============================== E2E Test=================== */

const newItemEntry = {
    item_name: 'Amazon Web Services',
    item_description: 'Cloud based server',
    item_type: 'Software',
    cost: '123',
}
let testName1 = "NewItem business"

describe('business', () => {
    test(`${testName1} should add new item`, async () => {
        const { item_name,
            item_description,
            item_type,
            cost,
            form, } = setup()
        const nameRequired = checkRequired(newItemEntry.item_name)
        const descRequired = checkRequired(newItemEntry.item_description)
        const typeRequired = checkRequired(newItemEntry.item_type)
        const costRequired = checkRequired(newItemEntry.cost)


        fireEvent.blur(item_name);
        fireEvent.change(item_name, { target: { value: newItemEntry.item_name } });

        fireEvent.blur(item_description);
        fireEvent.change(item_description, { target: { value: newItemEntry.item_description } });

        fireEvent.blur(item_type);
        fireEvent.change(item_type, { target: { value: newItemEntry.item_type } });

        fireEvent.blur(cost);
        fireEvent.change(cost, { target: { value: newItemEntry.cost } });

        fireEvent.submit(form);

        if (!nameRequired || !descRequired || !typeRequired || !costRequired) {
            expect(await screen.findByText(/required/i)).toBeTruthy();
        } else {
            await waitFor(async () => {
                let data = {
                    ...newItemEntry,
                    added_date: moment(Date.now()).format("D-MMMM-yyyy"),
                }
                await apiService('POST', '/items', data)
                    .then((res) => {
                        expect({ ...data, id: res.data.id }).toEqual(res.data)
                        expect(res.status).toBe(201)
                    })
            })
        }
        await act(() => Promise.resolve()); // To avoid act wrapping warning
    }

    )
})


/** ===========================End========================= **/
