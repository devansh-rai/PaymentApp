import BottomWarning  from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleClick()
    {
        // console.log(firstName, lastName, email, password);
        const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
            username: email,
            password: password,
            firstname: firstName,
            lastname: lastName
        });
        if(res.status !== 200)
        {
            alert("Invalid credentials");
            return;
        }
        else
        {
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            navigate("/dashboard");
            alert("User created successfully");
        }
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your details to create an account"} />
                    <InputBox placeholder="Devansh" label={"First Name"} setState = {setFirstName}/>
                    <InputBox placeholder="Rai" label={"Last Name"} setState = {setLastName}/>
                    <InputBox placeholder="dev@gmail.com" label={"Email"} setState = {setEmail}/>
                    <InputBox placeholder="123456" label={"Password"} setState = {setPassword}/>

                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={handleClick}></Button>
                    </div>
                    
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>

                </div>
            </div>
        </div>
    );

}
export default Signup;