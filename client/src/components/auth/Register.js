import React, {Component} from "react";
import Input from "../general/Input";

class Register extends Component {
    render() {
        return (
        <div className="container">
            <h1 className="large text-primary">Register</h1>
                <p className="lead"><i class="fa-solid fa-graduation-cap"></i> Create Your Account </p>
                <div className="form">
                    <Input type="text" placeholder="Enter Name" 
                    value="name"  
                    onChange={this.onChange} 
                    ></Input>
                </div>
        </div>
        )
    }
}