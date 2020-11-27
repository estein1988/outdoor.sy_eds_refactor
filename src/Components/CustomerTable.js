import React from 'react'

export default function CustomerTable(props) {
        return (
            <table className="customer-table">
            <thead>
                <tr>
                    <th>Customer
                    <button className={props.currentSort === 'last_name' ? 'active-sort' : undefined} onClick={() => {props.updateCurrentSort("last_name")}}>v</button>
                    </th>
                    <th>Email
                    <button className={props.currentSort === 'email' ? 'active-sort' : undefined} onClick={() => {props.updateCurrentSort("email")}}>v</button>
                    </th>
                    <th>Vehicle Type
                    <button className={props.currentSort === 'vehicle_type' ? 'active-sort' : undefined} onClick={() => {props.updateCurrentSort("vehicle_type")}}>v</button>
                    </th>
                    <th>Vehicle Name
                    <button className={props.currentSort === 'vehicle_name' ? 'active-sort' : undefined} onClick={() => {props.updateCurrentSort("vehicle_name")}}>v</button>
                    </th>
                    <th>Vehicle Length
                    <button className={props.currentSort === 'vehicle_length' ? 'active-sort' : undefined} onClick={() => {props.updateCurrentSort("vehicle_length")}}>v</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.displayedCustomers().map(customer =>{
                    return(
                        <tr>
                            <td>{customer.last_name}, {customer.first_name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.vehicle_type}</td>
                            <td>{customer.vehicle_name}</td>
                            <td>{customer.vehicle_length}</td>
                        </tr>
                    )
                })
                }
            </tbody>
            </table>
        )
}

