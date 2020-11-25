import { Component } from 'react';
import './App.css';
import AddNewCustomer from './Components/AddNewCustomer'
import CustomerTable from './Components/CustomerTable';
import Search from './Components/Search';

const apiUrl = 'http://localhost:3000/customers'

class App extends Component {
  state= {
    customers: [], 
    searchTerm: "",
    currentFilter: "all",
    currentSort: ""
  }
  componentDidMount(){
    fetch(apiUrl)
      .then(response => response.json())
      .then(customers =>{
        this.setState({customers})
      })
  }
  addNewCustomer = newCustomer => {
    this.setState(state => {
      state.customers = [...state.customers, newCustomer]
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
      if (this.state.currentFilter === "all"){
        return true 
      }else {
          return (
            customer.vehicle_type === this.state.currentFilter
          )
        }
    }).sort((a,b) => {
      if(!this.state.currentSort){
        return 0 
      }else {
        return a[this.state.currentSort] >= b[this.state.currentSort]
          ? 1
          : -1
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
  updateCurrentSort = (sortCriterion) => {
    this.setState({
      currentSort: sortCriterion
    })
  }
  render(){
    return (
      <div className="App">
        <header>
          <h1>Customer Management</h1>
          <div className="search-and-filter">
            <Search searchTerm={this.state.searchTerm} updateSearchTerm={this.updateSearchTerm}/>
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
        <CustomerTable displayedCustomers={this.displayedCustomers} currentSort={this.state.currentSort} />
        <AddNewCustomer addNewCustomer={this.addNewCustomer} />
      </div>
    );
  }
}

export default App