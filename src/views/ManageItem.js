import React, { useEffect, useState } from 'react'
import ItemListView from 'src/components/ItemListView';
import apiService from 'src/reusable/Api';

const ManageItem = () => {

    const [data, setData] = useState([])
    const fields = ['Name', 'item_description', 'item_type', 'Cost ($)', 'Remove']
    useEffect(() => {
        const fetchData = () => {
            apiService('GET', '/items', null)
                .then((res) => {
                    setData(res.data)
                })
        }
        fetchData()
    }, [])

    return (
        <ItemListView fields={fields} data={data} />
    )
}

export default ManageItem
