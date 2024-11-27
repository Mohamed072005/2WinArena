import toast from "react-hot-toast";
import LoginForm from "./LoginForm";
import { useState } from "react";
import axiosClient from "@/api/axiosClient";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "@/helpers/localStorage";

interface Payload {
    email: string
    password: string
}

interface Errors {
    email?: string
    password?: string
}

const LoginAPI: React.FC = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState<Errors>();
    const validateFormInputs = (payload: Payload) => {
        let errors: Errors = {}
        if(!payload.email.trim()) errors.email = 'Email is required'
        if(!payload.password.trim()) errors.password = 'Password is required'
        return errors;
    }

    const handelSubmitLoginForm = async (event: React.FormEvent) => {
        event.preventDefault();
        const payload = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        const error = validateFormInputs(payload);
        if (Object.keys(error).length) {
            setErrors(error);
            toast.error('Please fill out the form.');
            return;
        }
        
        try{
            const response = await axiosClient.post('/users/login', payload);
            if(response.data.statusCode === 202) {
                toast.success(response.data.message)
                setLocalStorage('token', response.data.token);
                navigate('/');
            }            
        }catch(err: any){
            if(err.response) toast.error(err.response.data.message.error);
            else toast.error(err.message)
        }
    }
    return (
        <>
            <LoginForm
            errors={errors}
            handelSubmitForm={handelSubmitLoginForm}
            />
        </>
    )
}

export default LoginAPI;
