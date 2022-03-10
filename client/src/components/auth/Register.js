import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import Input from "../general/Input";
import { register } from "../../actions/authActions";

export  class Register extends Component {

    constructor () {
        super()
        this.state = {
            name : "",
            email: "",
            password: "",
            password_two: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        console.log(e)
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit() {
        const {name, email, password} = this.state
        const newUser = {
            name,
            email,
            password
        };

        if (password === this.state.password_two) {
            this.props.register(newUser);
        }

        else {
            console.log("password do not match");
        }

    }

    
    
    render() {
        const { name, password, password_two, email} = this.state;
        return (
            <div className="container">
                <h1 className="large text-primary">Register</h1>
                    <p className="lead"><i class="fa-solid fa-graduation-cap"></i> Create Your Account </p>

                    <div className="form">
                        <Input
                        name = "name" 
                        type = "text" 
                        placeholder = "Enter Name" 
                        value = {name}  
                        onChange = {this.onChange} 
                        />
                    </div>

                    <div className="form">
                        <Input 
                        name = "email"
                        type = "email" 
                        placeholder = "Enter Email" 
                        value = {email}  
                        onChange = {this.onChange} 
                        />
                    </div>

                    <div className="form">
                        <Input 
                        name = "password"
                        type = "password" 
                        placeholder = "Enter Password" 
                        value = {password}  
                        onChange = {this.onChange} 
                        />
                    </div>

                    <div className="form">
                        <Input 
                        name = "password_two"
                        type = "password" 
                        placeholder = "Confirm Password" 
                        value = {password_two} 
                        onChange = {this.onChange} 
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.onSubmit}> Click to Register </button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { register })(withRouter(Register));