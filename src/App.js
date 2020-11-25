import { Component } from 'react';
import './App.css';
const apiUrl = 'http://localhost:3000/customers'
class App extends Component {
  state= {
    customers: [],
    newCustomer: { 
      first_name: "",
      last_name: "",
      email: "",
      vehicle_type: "",
      vehicle_name: "",
      vehicle_length: ""
    }, 
    searchTerm: "",
    currentFilter: "all"
  }
  componentDidMount(){
    fetch(apiUrl)
      .then(response => response.json())
      .then(customers =>{
        this.setState({customers})
      })
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
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newCustomer)
      }).catch(error => console.error(error.message))
  }
  displayedCustomers = () => {
    return this.state.customers.filter(customer => {
      if (!this.state.searchTerm){
      return true
      } else {
        return (
          customer.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
          || customer.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
      }
    }).filter(customer => {
      if (this.state.currentFilter == "all"){
        return true 
      }else {
          return (
            customer.vehicle_type === this.state.currentFilter
          )
        }
    })
  }
  updateSearchTerm = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }
  updateCurrentFilter = (event) => {
    this.setState({
      currentFilter: event.target.value
    })
  }
  render(){
    return (
      <div className="App">
        <header>
          <h1>Customer Management</h1>
          <div className="search-and-filter">
            <form className="search" >
              <label>Search by Customer 
              <input onChange={this.updateSearchTerm}type='text' name='search-term' />
              </label>
            </form>
            <form className="filter" >
              <select onChange={this.updateCurrentFilter} value={this.state.currentFilter}>
                <option value="all">Show all</option>
                <option value="RV">Show Only RVs</option>
                <option value="Sailboat">Show Only Sailboats</option>
                <option value="Van">Show Only Vans</option>
                <option value="Bike">Show Only Bikes</option>
              </select>
            </form>
          </div>
        </header>
        <section className='table'>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Customer<button>v</button></th>
                <th>Email<button>v</button></th>
                <th>Vehicle Type<button>v</button></th>
                <th>Vehicle Name<button>v</button></th>
                <th>Vehicle Length<button>v</button></th>
              </tr>
            </thead>
            <tbody>
              {this.displayedCustomers().map(customer =>{
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
          </section>
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
      </div>
    );
  }
}

export default App