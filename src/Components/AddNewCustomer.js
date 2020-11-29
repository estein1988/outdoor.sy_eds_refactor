import React, { Component } from 'react'

export default class  AddNewCustomer extends Component {
    state = {
        customers: [],
        newCustomer: { 
        first_name: "",
        last_name: "",
        email: "",
        vehicle_type: "",
        vehicle_name: "",
        vehicle_length: ""
        },
        selectedFile: null
    }
    updateNewCustomer = event =>{
        const key = event.target.name
        const value = event.target.value
        this.setState(state =>{
            state.newCustomer[key] = value
            return state
        })
    }
    addNewCustomer = event => {
        console.log("hit")
        event.preventDefault()
        const newCustomer = {
            first_name: this.state.newCustomer.first_name,
            last_name: this.state.newCustomer.last_name,
            email: this.state.newCustomer.email,
            vehicle_type: this.state.newCustomer.vehicle_type,
            vehicle_name: this.state.newCustomer.vehicle_name,
            vehicle_length: this.state.newCustomer.vehicle_length
        }
        this.setState(state => {
            state.customers = [...state.customers, newCustomer]
            state.newCustomer = {
            first_name: "",
            last_name: "",
            email: "",
            vehicle_type: "",
            vehicle_name: "",
            vehicle_length: ""
            }
            return state 
        })
        this.props.addNewCustomer(newCustomer)
    }
    render() {
        return (
            <section className="form-and-drop">
            <form onSubmit={this.addNewCustomer} className="add-new">
                <h3>Add New Customer</h3>
                <label htmlFor="firstName">First Name: </label>
                <input 
                    id="firstName"
                    onChange={this.updateNewCustomer} 
                    required 
                    type="text" 
                    name="first_name" 
                    value={this.state.newCustomer.first_name} 
                />
                <label htmlFor="lastName">Last Name: </label>
                <input 
                    id="lastName"
                    onChange={this.updateNewCustomer} 
                    required
                    type="text" 
                    name="last_name"  
                    value={this.state.newCustomer.last_name} 
                />
                <label htmlFor="email">Email: </label>
                <input 
                    id="email"
                    onChange={this.updateNewCustomer} 
                    required
                    type="text" 
                    name="email"
                    value={this.state.newCustomer.email}
                />
                <label htmlFor="vehicleType">Vehicle Type: </label>
                <select 
                    id="vehicleType"
                    onChange={this.updateNewCustomer} 
                    required
                    name="vehicle_type" 
                    value={this.state.newCustomer.vehicle_type}
                >
                    <option value="RV">RV</option>
                    <option value="sailboat">Sailboat</option>
                    <option value="campervan">Campervan</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="motorboat">Motorboat</option>
                </select>
                <label htmlFor="vehicleName">Vehicle Name:</label>
                <input 
                    id="vehicleName"
                    onChange={this.updateNewCustomer} 
                    required
                    type="text" 
                    name="vehicle_name"  
                    value={this.state.newCustomer.vehicle_name} 
                />
                <label htmlFor="vehicleLength">Vehicle Length</label>
                <input 
                    id="vehicleLength"
                    onChange={this.updateNewCustomer} 
                    required
                    type="text" 
                    name="vehicle_length" 
                    value={this.state.newCustomer.vehicle_length}
                />
                <input 
                    required
                    className="button"
                    type='submit' 
                    value="Add customer" 
                />
            </form>
            </section>
        )
    }
}
