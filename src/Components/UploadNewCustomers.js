import React from 'react'

export default function UploadNewCustomers() {
    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]})
    }
    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        axios.post('http://localhost:3000/customers', formData)
    };

    fileData = () => {
        if (this.state.selectedFile){
            return(
                <div> 
                <h2>File Details:</h2> 
                <p>File Name: {this.state.selectedFile.name}</p> 
                <p>File Type: {this.state.selectedFile.type}</p> 
                <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
                </p> 
            </div> 
            ); 
        } else { 
            return ( 
            <div> 
                <br /> 
                <h4>Choose before Pressing the Upload button</h4> 
            </div>  
            )
        }
    }
    return (
        <div>
            <div className="file-drop">
                <h2>Add Multiple Customers</h2>
                <input className="button" type="file" name="myFile" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                    Upload!
                </button>
            </div>
            {this.fileData()}
        </div>
    )
}
