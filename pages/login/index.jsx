import { useState } from "react";
import Form from "../../components/form";
import {login} from "../../services/auth";
import { useNavigate } from "react-router-dom";
export default function Login() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if(token){
    navigate("/")
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });
  
  const formFeilds = [
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
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (e) =>{
        setFormData({...formData, password: e.target.value})
      }
    }
  ]

  const errMessages = {
    email: {
      message: "Email is required",
      isValid: formData.email.length > 0,
      onError: ()=>{
        setError((error) => ({...error, email: true}) )
      }
    },
    password: {
      message: "Password is required",
      isValid: formData.password.length > 0,
      onError: ()=>{
        setError((error) => ({...error, password: true}) )
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
    try {
      if(!isError){
        const res = await login(formData);
        if(res.status === 200){
          alert("Logged In Successfully");
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
        } 
        else{
          alert("Something went wrong");
        }
      }
    } catch (e) {
      if(e.response.status === 400){
        alert("Invalid email or password");
      }
    }
  }

  return (
    <div>
      <p>Login</p> 
      <Form formFeilds={formFeilds} onSubmit={onSubmit} errMessages={errMessages} error={error} />
    </div>
  )
}
