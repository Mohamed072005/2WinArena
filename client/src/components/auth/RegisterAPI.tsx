import toast from "react-hot-toast";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import axiosClient from "@/api/axiosClient";
import { useNavigate } from "react-router-dom";

interface Payload {
    full_name: string
    email: string
    password: string
}

interface Errors {
    full_name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const RegisterAPI: React.FC = () => {

    const [errors, setErrors] = useState<Errors>()
    const navigate = useNavigate()
    const validateFormInputs = (payload: Payload, confirmPassword: string) => {
        let error: Errors = {};
        if(!payload.full_name.trim()) error.full_name = 'User name is required'
        if(!payload.email.trim()) error.email = 'Email is required'
        if(!payload.password.trim()) error.password = 'Password is required'
        if(!confirmPassword.trim()) error.confirmPassword = 'Confermed Password is required'
        if(confirmPassword !== payload.password) error.confirmPassword = 'No match password'
        return error;
    }

    const handelSubmitRegisterForm = async (event: React.FormEvent) => {
        event.preventDefault();
        const payload = {
            full_name: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        const error = validateFormInputs(payload, event.target.confirmPassword.value)
        if (Object.keys(error).length) {
            setErrors(error);
            toast.error('Please fill out the form.');
            return;
        }

        try{
            const response = await axiosClient.post('/users/register', payload);
            if(response.data.statusCode === 201) {
                toast.success(response.data.message);
                navigate('/auth/login');
            }
            
        }catch(err: any){
            if(err.response) toast.error(err.response.data.message.error);
            toast.error(err.message)
        }
    }
    return (
        <>
            <RegisterForm
            errors={errors}
            handelSubmitForm={handelSubmitRegisterForm}
            />
        </>
    );
}

export default RegisterAPI;
