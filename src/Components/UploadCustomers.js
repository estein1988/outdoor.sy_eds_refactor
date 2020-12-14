import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'

const customersURL = 'http://localhost:3000/customers'

export default class UploadCustomers extends Component {

    handleReadCSV = data => { 
        for(let i = 0; i < data.length; i++) {
            let csv_first_name = data[i].data[0]
            let csv_last_name = data[i].data[1]
            let csv_email = data[i].data[2]
            let csv_vehicle_type = data[i].data[3]
            let csv_vehicle_name = data[i].data[4]
            let csv_vehicle_length = data[i].data[5]
        
            fetch(customersURL,{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json" //missing quotes around accept
                },
                body: JSON.stringify({
                    first_name: csv_first_name,
                    last_name: csv_last_name,
                    email: csv_email,
                    vehicle_type: csv_vehicle_type,
                    vehicle_name: csv_vehicle_name,
                    vehicle_length: csv_vehicle_length
                })
            }).then(window.location.reload())
        }
    }

    render(){ 
        return (
            <div className="file-drop">
                <h3>Add New Customers</h3>
                <label> Drop File Below to Upload
                    <CSVReader 
                        onFileLoad = {this.handleReadCSV} 
                        noClick
                    >
                    </CSVReader>
                </label>
            </div> 
        );
    }
}