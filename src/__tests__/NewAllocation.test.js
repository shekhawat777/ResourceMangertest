import React from 'react'
import { render, screen, fireEvent, act, queryByAttribute, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { checkRequired } from 'src/reusable/utils';
import apiService from '../reusable/Api';
import NewAllocation from '../components/NewAllocation';
import moment from 'moment';

const getById = queryByAttribute.bind(null, 'id');

const setup = () => {
    const utils = render(
        <BrowserRouter>
            <NewAllocation />
        </BrowserRouter>
    )
    const allocated_to = getById(utils.container, 'allocated_to');
    const item = getById(utils.container, 'item');
    const item_description = getById(utils.container, 'item_description');
    const project = getById(utils.container, 'project');
    const allocation_date = getById(utils.container, 'allocation_date');
    const po_no = getById(utils.container, 'po_no');
    const po_amount = getById(utils.container, 'po_amount');
    const start_date = getById(utils.container, 'start_date');
    const end_date = getById(utils.container, 'end_date');
    const button = getById(utils.container, 'button');
    const form = getById(utils.container, 'form');
    return {
        allocated_to,
        item,
        item_description,
        project,
        allocation_date,
        po_no,
        po_amount,
        start_date,
        end_date,
        button,
        form,
        ...utils,
    }
}

let testName = "NewAllocation boundary"
/** ===========================Check All Validation for Input Fields========================= **/
describe('boundary', () => {

    test(testName + ' allocated_to is required', async () => {
        const { allocated_to } = setup()
        fireEvent.blur(allocated_to);
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' allocated_to is Valid', async () => {
        const { allocated_to } = setup()
        fireEvent.blur(allocated_to);
        act(() => {
            fireEvent.change(allocated_to, { target: { value: 'abc@def.com' } });
        });
        await waitFor(async () => {
            const Error = screen.queryByText(/required/i);
            expect(Error).toBeNull();
        })
    });
});


describe('boundary', () => {

    test(testName + ' item is required', async () => {
        const { item } = setup()
        act(() => {
            fireEvent.blur(item);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' item is Valid', async () => {
        const { item } = setup()
        act(() => {
            fireEvent.blur(item);
            fireEvent.change(item, { target: { value: 'Harshit Kishor' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
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
            fireEvent.change(item_description, { target: { value: '9987654545' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {
    test(testName + ' project is required', async () => {
        const { project } = setup()
        act(() => {
            fireEvent.blur(project);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' project is Valid', async () => {
        const { project } = setup()
        act(() => {
            fireEvent.blur(project);
            fireEvent.change(project, { target: { value: 'Product Management' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});

describe('boundary', () => {
    test(testName + ' po_no is required', async () => {
        const { po_no } = setup()
        act(() => {
            fireEvent.blur(po_no);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' po_no is Valid', async () => {
        const { po_no } = setup()
        act(() => {
            fireEvent.blur(po_no);
            fireEvent.change(po_no, { target: { value: 'Product Management' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});
describe('boundary', () => {
    test(testName + ' po_amount is required', async () => {
        const { po_amount } = setup()
        act(() => {
            fireEvent.blur(po_amount);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' po_amount is Valid', async () => {
        const { po_amount } = setup()
        act(() => {
            fireEvent.blur(po_amount);
            fireEvent.change(po_amount, { target: { value: 'Product Management' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});

describe('boundary', () => {
    test(testName + ' allocation_date is required', async () => {
        const { allocation_date } = setup()
        act(() => {
            fireEvent.blur(allocation_date);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' allocation_date is Valid', async () => {
        const { allocation_date } = setup()
        act(() => {
            fireEvent.blur(allocation_date);
            fireEvent.change(allocation_date, { target: { value: '01/01/1995' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});

describe('boundary', () => {
    test(testName + ' start_date is required', async () => {
        const { start_date } = setup()
        act(() => {
            fireEvent.blur(start_date);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' start_date is Valid', async () => {
        const { start_date } = setup()
        act(() => {
            fireEvent.blur(start_date);
            fireEvent.change(start_date, { target: { value: '01/01/2012' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});

describe('boundary', () => {
    test(testName + ' end_date is required', async () => {
        const { end_date } = setup()
        act(() => {
            fireEvent.blur(end_date);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' end_date is Valid', async () => {
        const { end_date } = setup()
        act(() => {
            fireEvent.blur(end_date);
            fireEvent.change(end_date, { target: { value: '01/01/2012' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});
/** ===========================End========================= **/

/* ============================== E2E Test=================== */

const newAllocationEntry = {
    allocated_to: 'Harshit Kishor',
    item: 'Mobile',
    item_description: 'Mobile allocation test description',
    project: 'Test Project',
    allocation_date: '01/11/2021',
    po_no: '133',
    po_amount: '123.3',
    start_date: '11/11/2021',
    end_date: '11/12/2021',
}
let testName1 = "NewAllocation business"

describe('business', () => {
    test(`${testName1} should add new allocation`, async () => {
        const { allocated_to, item, item_description, form, project, po_no, po_amount, allocation_date, start_date, end_date } = setup()
        const allocationRequired = checkRequired(newAllocationEntry.allocated_to)
        const itemRequired = checkRequired(newAllocationEntry.item)
        const item_descriptionRequired = checkRequired(newAllocationEntry.item_description)
        const projectRequired = checkRequired(newAllocationEntry.project)
        const po_noRequired = checkRequired(newAllocationEntry.po_no)
        const po_amountRequired = checkRequired(newAllocationEntry.po_amount)
        const allocation_dateValid = checkRequired(newAllocationEntry.allocation_date)
        const start_dateRequired = checkRequired(newAllocationEntry.start_date)
        const end_dateRequired = checkRequired(newAllocationEntry.end_date)


        fireEvent.blur(allocated_to);
        fireEvent.change(allocated_to, { target: { value: newAllocationEntry.allocated_to } });

        fireEvent.blur(item);
        fireEvent.change(item, { target: { value: newAllocationEntry.item } });

        fireEvent.blur(item_description);
        fireEvent.change(item_description, { target: { value: newAllocationEntry.item_description } });

        fireEvent.blur(project);
        fireEvent.change(project, { target: { value: newAllocationEntry.project } });

        fireEvent.blur(po_no);
        fireEvent.change(po_no, { target: { value: newAllocationEntry.po_no } });

        fireEvent.blur(po_amount);
        fireEvent.change(po_amount, { target: { value: newAllocationEntry.po_amount } });


        fireEvent.change(allocation_date, { target: { value: newAllocationEntry.allocation_date } });

        fireEvent.change(start_date, { target: { value: newAllocationEntry.start_date } });

        fireEvent.change(end_date, { target: { value: newAllocationEntry.end_date } });

        fireEvent.submit(form);

        if (!allocationRequired || !projectRequired || !itemRequired || !item_descriptionRequired || !po_noRequired || !allocation_dateValid || !po_amountRequired || !start_dateRequired || !end_dateRequired) {
            expect(await screen.findByText(/required/i)).toBeTruthy();
        } else {
            await waitFor(async () => {
                let data = {
                    ...newAllocationEntry,
                    allocation_date: moment(newAllocationEntry.allocation_date).format("D-MMMM-yyyy"),
                    start_date: moment(newAllocationEntry.start_date).format("D-MMMM-yyyy"),
                    end_date: moment(newAllocationEntry.end_date).format("D-MMMM-yyyy"),
                }
                await apiService('POST', '/allocations', data)
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
