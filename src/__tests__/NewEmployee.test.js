import React from 'react'
import { render, screen, fireEvent, act, queryByAttribute, waitFor } from '@testing-library/react';
import NewEmployee from '../components/NewEmployee';
import { BrowserRouter } from 'react-router-dom';
import { checkEmail, checkRequired } from 'src/reusable/utils';
import apiService from '../reusable/Api';
import moment from 'moment';

const getById = queryByAttribute.bind(null, 'id');

const setup = () => {
    const utils = render(
        <BrowserRouter>
            <NewEmployee />
        </BrowserRouter>
    )
    const employee_name = getById(utils.container, 'employee_name');
    const employee_email = getById(utils.container, 'employee_email');
    const employee_mobile = getById(utils.container, 'employee_mobile');
    const employee_project = getById(utils.container, 'employee_project');
    const employee_birth_date = getById(utils.container, 'employee_birth_date');
    const employee_added_date = getById(utils.container, 'employee_added_date');
    const button = getById(utils.container, 'button');
    const form = getById(utils.container, 'form');
    return {
        employee_name,
        employee_email,
        employee_mobile,
        employee_project,
        employee_birth_date,
        employee_added_date,
        button,
        form,
        ...utils,
    }
}

let testName = "NewEmployee boundary"
/** ===========================Check All Validation for Input Fields========================= **/
describe('boundary', () => {

    test(testName + ' Employee Email is required', async () => {
        const { employee_email } = setup()
        fireEvent.blur(employee_email);
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' Employee Email is invalid', async () => {
        const { employee_email } = setup()
        fireEvent.blur(employee_email);
        act(() => {
            fireEvent.change(employee_email, { target: { value: 'abc@def' } });
        });
        await waitFor(async () => {
            expect(await screen.findByText(/Invalid email/i)).toBeTruthy();
        })

    });

    test(testName + ' Employee Email is Valid', async () => {
        const { employee_email } = setup()
        fireEvent.blur(employee_email);
        act(() => {
            fireEvent.change(employee_email, { target: { value: 'abc@def.com' } });
        });
        await waitFor(async () => {
            const emailError = screen.queryByText(/Invalid email/i);
            expect(emailError).toBeNull();
        })

    });
});


describe('boundary', () => {

    test(testName + ' employee_name is required', async () => {
        const { employee_name } = setup()
        act(() => {
            fireEvent.blur(employee_name);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' employee_name is Valid', async () => {
        const { employee_name } = setup()
        act(() => {
            fireEvent.blur(employee_name);
            fireEvent.change(employee_name, { target: { value: 'Harshit Kishor' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {

    test(testName + ' employee_mobile is required', async () => {
        const { employee_mobile } = setup()
        act(() => {
            fireEvent.blur(employee_mobile);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' employee_mobile is Valid', async () => {
        const { employee_mobile } = setup()
        act(() => {
            fireEvent.blur(employee_mobile);
            fireEvent.change(employee_mobile, { target: { value: '9987654545' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});


describe('boundary', () => {
    test(testName + ' employee_project is required', async () => {
        const { employee_project } = setup()
        act(() => {
            fireEvent.blur(employee_project);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' employee_project is Valid', async () => {
        const { employee_project } = setup()
        act(() => {
            fireEvent.blur(employee_project);
            fireEvent.change(employee_project, { target: { value: 'Product Management' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});

describe('boundary', () => {
    test(testName + ' employee_birth_date is required', async () => {
        const { employee_birth_date } = setup()
        act(() => {
            fireEvent.blur(employee_birth_date);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' employee_birth_date is Valid', async () => {
        const { employee_birth_date } = setup()
        act(() => {
            fireEvent.blur(employee_birth_date);
            fireEvent.change(employee_birth_date, { target: { value: '01/01/1995' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});

describe('boundary', () => {
    test(testName + ' employee_added_date is required', async () => {
        const { employee_added_date } = setup()
        act(() => {
            fireEvent.blur(employee_added_date);
        });
        await waitFor(async () => {
            expect(await screen.findByText(/required./i)).toBeTruthy();
        })

    });

    test(testName + ' employee_added_date is Valid', async () => {
        const { employee_added_date } = setup()
        act(() => {
            fireEvent.blur(employee_added_date);
            fireEvent.change(employee_added_date, { target: { value: '01/01/2012' } });
        });
        await waitFor(async () => {
            const Error = await screen.queryByText(/required./i);
            expect(Error).toBeNull();
        })

    });
});
/** ===========================End========================= **/

/* ============================== E2E Test=================== */

const newEmployeeEntry = {
    employee_name: 'Harshit Kishor',
    employee_email: 'harshit@gmail.com',
    employee_mobile: '9696969696',
    employee_project: 'Test Management',
    employee_birth_date: '01/01/1990',
    employee_added_date: '01/01/2021',
}
let testName1 = "NewEmployee business"

describe('business', () => {
    test(`${testName1} should add new employee`, async () => {
        const { employee_name, employee_email, employee_mobile, employee_project, employee_birth_date, employee_added_date, form, } = setup()
        const nameRequired = checkRequired(newEmployeeEntry.employee_name)
        const projectRequired = checkRequired(newEmployeeEntry.employee_project)
        const mobileRequired = checkRequired(newEmployeeEntry.employee_mobile)
        const emailRequired = checkRequired(newEmployeeEntry.employee_email)
        const dobRequired = checkRequired(newEmployeeEntry.employee_birth_date)
        const dojRequired = checkRequired(newEmployeeEntry.employee_added_date)
        const emailValid = checkEmail(newEmployeeEntry.employee_email)


        fireEvent.blur(employee_name);
        fireEvent.change(employee_name, { target: { value: newEmployeeEntry.employee_name } });

        fireEvent.blur(employee_project);
        fireEvent.change(employee_project, { target: { value: newEmployeeEntry.employee_project } });

        fireEvent.blur(employee_mobile);
        fireEvent.change(employee_mobile, { target: { value: newEmployeeEntry.employee_mobile } });

        fireEvent.blur(employee_email);
        fireEvent.change(employee_email, { target: { value: newEmployeeEntry.employee_email } });

        fireEvent.blur(employee_birth_date);
        fireEvent.change(employee_birth_date, { target: { value: newEmployeeEntry.employee_birth_date } });

        fireEvent.blur(employee_added_date);
        fireEvent.change(employee_added_date, { target: { value: newEmployeeEntry.employee_added_date } });

        fireEvent.submit(form);

        if (!nameRequired || !projectRequired || !mobileRequired || !emailRequired || !dobRequired || !dojRequired) {
            expect(await screen.findByText(/required/i)).toBeTruthy();
        } else if (emailRequired && !emailValid) {
            expect(await screen.findByText(/Invalid email./i)).toBeTruthy();
        } else {
            await waitFor(async () => {
                let data = {
                    ...newEmployeeEntry,
                    employee_birth_date: moment(newEmployeeEntry.employee_birth_date).format("D-MMMM-yyyy"),
                    employee_added_date: moment(newEmployeeEntry.employee_added_date).format("D-MMMM-yyyy")
                }
                await apiService('POST', '/employees', data)
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
