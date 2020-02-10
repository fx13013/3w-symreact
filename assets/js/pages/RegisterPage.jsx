import React, { useState } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import UsersAPI from '../services/usersAPI';

const RegisterPage = ({ history }) => {
    
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({ ...user, [name]: value })
    }

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Erreur de confirmation du mot de passe";
            setErrors(apiErrors);
            return;
        }

        try{
            await UsersAPI.register(user);
            // TODO : flash succès
            setErrors({});
            history.replace("/login");
            console.log(response);
        }catch(error){
            const {violations} = error.response.data;
            if(violations){
                
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
            }
            // TODO : flash erreur
        }
    }
    
    return ( 
        <>
            <h1>Inscription</h1>

            <form onSubmit={handleSubmit}>
                <Field name="firstName" 
                       label="Prénom" 
                       placeholder="Votre joli prénom" 
                       onChange={handleChange} 
                       error={errors.firstName} 
                       value={user.firstName}
                />
                <Field name="lastName" 
                       label="Nom de famille" 
                       placeholder="Votre nom de famille" 
                       onChange={handleChange} 
                       error={errors.lastName} 
                       value={user.lastName}
                />
                <Field name="email" 
                       label="Email" 
                       placeholder="Votre adresse email"
                       type="email" 
                       onChange={handleChange} 
                       error={errors.email} 
                       value={user.email}
                />
                <Field name="password" 
                       label="Mot de passe" 
                       placeholder="Votre mot de passe"
                       type="password" 
                       onChange={handleChange} 
                       error={errors.password} 
                       value={user.password}
                />
                <Field name="passwordConfirm" 
                       label="Confirmation du mot de passe"
                       type="password" 
                       onChange={handleChange} 
                       error={errors.passwordConfirm} 
                       value={user.passwordConfirm}
                />
                <div className="group-form">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/login" className="btn btn-link">Je possède un compte</Link>
                </div>
            </form>
        </> 
    );
}
 
export default RegisterPage;