import React, { useEffect, useState } from 'react'
import apiService from 'src/reusable/Api';
import EmployeeListView from 'src/components/EmployeeListView';

const Employee = () => {
    const [data, setData] = useState([])
    const fields = ['employee_id', 'employee_name', "Email", "Mobile", "Project", "Birth Date", "Assigned Date", 'Remove']
    useEffect(() => {
        const fetchData = async () => {
            await apiService('GET', '/employees', null)
                .then((res) => {
                    setData(res.data)
                })
        }
        fetchData()
    }, [])
    return (
        <EmployeeListView data={data} fields={fields} />
    )
}

export default Employee
