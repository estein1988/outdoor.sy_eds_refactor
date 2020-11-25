import React, { Component } from 'react'

export default class  AddNewCustomer extends Component {
    state= {
        customers: [],
        newCustomer: { 
        first_name: "",
        last_name: "",
        email: "",
        vehicle_type: "",
        vehicle_name: "",
        vehicle_length: ""
        } 
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
                <h2>Add a New Customer</h2>
                <input 
                    onChange={this.updateNewCustomer} 
                    required 
                    type="text" 
                    name="first_name" 
                    placeholder="First Name" 
                    value={this.state.newCustomer.first_name} 
                />
                <input 
                    onChange={this.updateNewCustomer} 
                    type="text" 
                    name="last_name" 
                    placeholder="Last Name" 
                    value={this.state.newCustomer.last_name} 
                />
                <input 
                    onChange={this.updateNewCustomer} 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={this.state.newCustomer.email}
                />
                <select 
                    onChange={this.updateNewCustomer} 
                    name="vehicle_type" 
                    value={this.state.newCustomer.vehicle_type}
                >
                    <option >Vehicle Type</option>
                    <option value="Rv">RV</option>
                    <option value="sailboat">Sailboat</option>
                    <option value="van">Van</option>
                    <option value="bike">Bike</option>
                </select>
                <input 
                    onChange={this.updateNewCustomer} 
                    type="text" 
                    name="vehicle_name" 
                    placeholder="Vehicle Name" 
                    value={this.state.newCustomer.vehicle_name} 
                />
                <input 
                    onChange={this.updateNewCustomer} 
                    type="text" 
                    name="vehicle_length" 
                    placeholder="Vehicle Length" 
                    value={this.state.newCustomer.vehicle_length}
                />
                <input 
                    onChange={this.updateNewCustomer} 
                    type='submit' 
                    value="Add customer" 
                />
            </form>
            <div className="file-drop">
                <p>Drag and Drop Files Here</p>
            </div>
            </section>
        )
    }
}
