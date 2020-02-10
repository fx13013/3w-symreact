import React from 'react';

const Field = ({ name, label, value, onChange, placeholder = "", type = "text", error = "" }) => 
    ( 
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input 
            type={type} 
            onChange={onChange}
            placeholder={placeholder || label}
            name={name}
            id={name} 
            className={"form-control" + (error && " is-invalid")} 
            value={value} 
        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
    );

 
export default Field;