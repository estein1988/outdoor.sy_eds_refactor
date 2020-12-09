import { Component } from 'react';
import './App.css';
import CustomerTable from './Components/CustomerTable';
import Filter from './Components/Filter';
import Header from './Components/Header';
import Search from './Components/Search';
import UploadCustomers from './Components/UploadCustomers';

const apiUrl = 'http://localhost:3000/customers'

class App extends Component {
  state = {
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
    const filteredName = this.displayedCustomersName()
    const filteredVehicleType = this.displayedCustomersVehicleType(filteredName)
    return this.displayedCustomersSort(filteredVehicleType)
  }

  displayedCustomersSort = (filteredVehicleType) => {
    return filteredVehicleType.sort((a,b) => {
      if(!this.state.currentSort){
        return 0 
      }else {
        return a[this.state.currentSort] >= b[this.state.currentSort]
          ? 1
          : -1
      }
    })
  }

  displayedCustomersVehicleType = (filteredName) => {
    return filteredName.filter(customer => {
      if (this.state.currentFilter === "all"){
        return true 
      }else {
          return (
            customer.vehicle_type === this.state.currentFilter
          )
        }
    })
  }

  displayedCustomersName = () => {
    return this.state.customers.filter(customer => {
      if (!this.state.searchTerm){
        return true
      } else {
        return (
          customer.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
          || customer.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
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
  updateCurrentSort = (sortCriterion) => {
    this.setState({
      currentSort: sortCriterion
    })
  }
  render(){
    return (
      <div className="App">
        <Header />
        <header>
          <div className="search-and-filter">
            <Search searchTerm={this.state.searchTerm} updateSearchTerm={this.updateSearchTerm}/>
            <Filter  updateCurrentFilter={this.updateCurrentFilter} />
            
          </div>
        </header>
        <CustomerTable displayedCustomers={this.displayedCustomers} updateCurrentSort={this.updateCurrentSort} currentSort = {this.state.currentSort} />
        <section className="table-and-upload"> 
          <UploadCustomers />
        </section>
        
      </div>
    );
  }
}

export default App