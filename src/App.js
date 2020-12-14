//change index.html favicon icon and HTML title

import { Component } from 'react';
import CustomerTable from './Components/CustomerTable';
import Filter from './Components/Filter';
import Header from './Components/Header';
import Search from './Components/Search';
import UploadCustomers from './Components/UploadCustomers';
import './App.css';

const customersUrl = 'http://localhost:3000/customers'

class App extends Component {

  state = {
    customers: [], 
    searchTerm: "",
    currentFilter: "all",
    currentSort: ""
  }

  componentDidMount(){
    fetch(customersUrl)
      .then(response => response.json())
      .then(customers => {
        this.setState({customers})
      })
  }

  addNewCustomer = newCustomer => {
    this.setState(state => {
      state.customers = [...state.customers, newCustomer]
      return state 
    })
    fetch(customersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newCustomer)
    }).catch(error => console.error(error.message)) //does this get appended anywhere? i've had trouble getting error messages onto the screen in React too, I was wondering if you wanted to try to tackle it together because I'd like to know how too.
  }
  
  displayedCustomers = () => {
    const filteredName = this.displayedCustomersName()
    const filteredVehicleType = this.displayedCustomersVehicleType(filteredName)
    return this.displayedCustomersSort(filteredVehicleType)
  }

  displayedCustomersSort = (filteredVehicleType) => {
    return filteredVehicleType.sort((a,b) => {
      if(!this.state.currentSort) {
        return 0 
      } else {
        return a[this.state.currentSort] >= b[this.state.currentSort] ? 1 : -1
      }
    })
  }

  displayedCustomersVehicleType = (filteredName) => {
    return filteredName.filter(customer => {
      if (this.state.currentFilter === "all") {
        return true 
      } else {
        return (customer.vehicle_type === this.state.currentFilter)
      }
    })
  }

  displayedCustomersName = () => {
    return this.state.customers.filter(customer => {
      if (!this.state.searchTerm) {
        return true
      } else {
        return (
          customer.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
          customer.last_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
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
    const {searchTerm, currentSort} = this.state
    const {updateSearchTerm, updateCurrentFilter, displayedCustomers, updateCurrentSort} = this

    return (
      <div className="App">
        <Header />
        <header>
          <div className="search-and-filter">
            <Search searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} />
            <Filter  updateCurrentFilter={updateCurrentFilter} />
          </div>
        </header>
          <CustomerTable currentSort={currentSort} displayedCustomers={displayedCustomers} updateCurrentSort={updateCurrentSort} />
        <section className="table-and-upload"> 
          <UploadCustomers />
        </section>
      </div>
    );
  }
}

export default App