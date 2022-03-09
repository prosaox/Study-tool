import React from "react";
import propTypes from "prop-types";


const Input = (type, name, placeholder, value, onChange) => {
    return (
        <div>
            <div className="form-group">
                <input type = {type}
                placeholder = {placeholder}
                name = {name}
                value = {value}
                onChange = {onChange} />
            </div>
        </div>
    );
};

Input.propTypes = {
    name: propTypes.string,
    placeholder: propTypes.string,
    value: propTypes.string,
    type: propTypes.string.isRequired,
    onchange: propTypes.func.isRequired,
};

export default Input;