import React, { useEffect, useState } from 'react'
import AllocationListView from 'src/components/AllocationListView';
import apiService from 'src/reusable/Api';


const Allocation = () => {
    const [data, setData] = useState([])
    const fields = ['allocation_id', 'allocated_to', 'item', 'project', 'allocation_date', 'po_no', 'po_amount', 'lifeTime']
    useEffect(() => {
        const fetchData = () => {
            apiService('GET', '/allocations', null)
                .then((res) => {
                    setData(res.data)
                })
        }
        fetchData()
    }, [])

    return (
        <AllocationListView data={data} fields={fields} />
    )
}

export default Allocation
