import React from 'react'
import { render, screen, fireEvent, act, queryByAttribute, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { checkRequired } from 'src/reusable/utils';
import apiService from '../reusable/Api';
import NewProject from 'src/components/NewProject';

const getById = queryByAttribute.bind(null, 'id');

const setup = () => {
    const utils = render(
        <BrowserRouter>
            <NewProject />
        </BrowserRouter>
    )
    const project_name = getById(utils.container, 'project_name');
    const project_description = getById(utils.container, 'project_description');
    const project_start_date = getById(utils.container, 'project_start_date');
    const button = getById(utils.container, 'button');
    const form = getById(utils.container, 'form');
    return {
        project_name,
        project_description,
        project_start_date,
        button,
        form,
        ...utils,
    }
}

let testName = "NewProject boundary"
/** ===========================Check All Validation for Input Fields========================= **/
describe('boundary', () => {

    test(testName + ' project_name is required', async () => {
        const { project_name } = setup()
        fireEvent.blur(project_name);
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' project_name is Valid', async () => {
        const { project_name } = setup()
        fireEvent.blur(project_name);
        act(() => {
            fireEvent.change(project_name, { target: { value: 'Data Directory' } });
        });
        await waitFor(async () => {
            const Error = screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {

    test(testName + ' project_description is required', async () => {
        const { project_description } = setup()
        act(() => {
            fireEvent.blur(project_description);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' project_description is Valid', async () => {
        const { project_description } = setup()
        act(() => {
            fireEvent.blur(project_description);
            fireEvent.change(project_description, { target: { value: 'LI Data' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {

    test(testName + ' project_start_date is required', async () => {
        const { project_start_date } = setup()
        act(() => {
            fireEvent.blur(project_start_date);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' project_start_date is Valid', async () => {
        const { project_start_date } = setup()
        act(() => {
            fireEvent.blur(project_start_date);
            fireEvent.change(project_start_date, { target: { value: '12/11/2019' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


/** ===========================End========================= **/

/* ============================== E2E Test=================== */

const newProjectEntry = {
    project_name: 'Data Directory',
    project_description: 'LI Data',
    project_start_date: '2-October-2019',
}
let testName1 = "NewProject business"

describe('business', () => {
    test(`${testName1} should add new project`, async () => {
        const { project_name,
            project_description,
            project_start_date,
            form, } = setup()
        const nameRequired = checkRequired(newProjectEntry.project_name)
        const descRequired = checkRequired(newProjectEntry.project_description)
        const startDateRequired = checkRequired(newProjectEntry.project_start_date)


        fireEvent.blur(project_name);
        fireEvent.change(project_name, { target: { value: newProjectEntry.project_name } });

        fireEvent.blur(project_description);
        fireEvent.change(project_description, { target: { value: newProjectEntry.project_description } });

        fireEvent.blur(project_start_date);
        fireEvent.change(project_start_date, { target: { value: newProjectEntry.project_start_date } });

        fireEvent.submit(form);

        if (!nameRequired || !descRequired || !startDateRequired) {
            expect(await screen.findByText(/required/i)).toBeTruthy();
        } else {
            await waitFor(async () => {

                await apiService('POST', '/projects', newProjectEntry)
                    .then((res) => {
                        expect({ ...newProjectEntry, id: res.data.id }).toEqual(res.data)
                        expect(res.status).toBe(201)
                    })
            })
        }
        await act(() => Promise.resolve()); // To avoid act wrapping warning
    }

    )
})


/** ===========================End========================= **/
