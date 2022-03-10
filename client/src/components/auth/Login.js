import React, {Component} from "react";
import { Link } from "react-router-dom";
import Input from "../general/Input";

export default class Login extends Component {

    constructor () {
        super()
        this.state = {
            name : "",
            email: "",
            password_one: "",
            password_two: "",
        }
    }

    onChange(e) {
        console.log(e)
    }


    render() {
        return (
            <div className="container">
              <h1 className="large text-primary">Sign In</h1>
              <p className="lead">
                <i className="fas fa-user"></i>Sign Into Your Account
              </p>
              <div className="form">
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form">
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button className="btn btn-primary"> Sign In </button>
              <p className="my-1"> If you don't have an account - <Link to="/register"> Sign Up </Link> </p>
            </div>
          );
        }
};
