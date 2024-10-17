import { useState } from "react";
import Form from "../../components/form";
import {register} from "../../services/auth";
import { useNavigate } from "react-router-dom";
export default function Register() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    checkbox: false
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false,
    checkbox: false
  });
  
  const formFeilds = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      value: formData.value,
      onChange: (e) =>{
        setFormData({...formData, name: e.target.value})
      }
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      value: formData.email,
      onChange: (e) =>{
        setFormData({...formData, email: e.target.value})
      }
    },
    {
      name: "mobile",
      type: "number",
      placeholder: "Enter your mobile number",
      value: formData.mobile,
      onChange: (e) => {
        setFormData({...formData, mobile: e.target.value})
      }
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (e) =>{
        setFormData({...formData, password: e.target.value})
      }
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm you password",
      value: formData.confirmPassword,
      onChange: (e) =>{
        setFormData({...formData, confirmPassword: e.target.value})
      }
    },
    {
      name: "checkbox",
      type: "checkbox",
      label: "Agree to terms and conditions",
      value: formData.checkbox,
      onChange: (e) =>{
        setFormData({...formData, checkbox: e.target.checked})
      }
    }

  ]

  const errMessages = {
    name: {
      message: "Name is required",
      isValid: formData.name.length > 0,
      onError: ()=>{
        setError((error) => ({...error, name: true}) )
      }
    },
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: ()=>{
        setError((error) => ({...error, email: true}) )
      }
    },
    
    mobile: {
      message: "Mobile number is required",
      isValid: formData.mobile.length > 9,
      onError: ()=> {
        setError((error)=> ({...error, mobile: true}))
      }
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: ()=>{
        setError((error) => ({...error, password: true}) )
      }
    },
    confirmPassword: {
      message: "Password do not match",
      isValid: formData.confirmPassword === formData.password,
      onError: ()=>{
        setError((error) => ({...error, confirmPassword: true}) )
      }
    },
    checkbox: {
      message: "You must agree to term and condtions",
      isValid: formData.checkbox,
      onError: ()=> {
        setError((error)=> ({...error, checkbox:true}))
      }
    }
  }

  const onSubmit =async (e) =>{
    e.preventDefault();
    let isError = false;
    Object.keys(errMessages).forEach(key => {
      if(!errMessages[key].isValid){
        isError = true;
        errMessages[key].onError();
      }
    })
    if(!isError){
      const res = await register(formData);
      if(res.status === 201){
        alert("Registered Successfully");
        navigate("/login");
      } 
      else{
        alert("Something went wrong");
      }
    }
  }

  return (
    <div>
      <p>Register</p> 
      <Form formFeilds={formFeilds} onSubmit={onSubmit} errMessages={errMessages} error={error} />
    </div>
  )
}
