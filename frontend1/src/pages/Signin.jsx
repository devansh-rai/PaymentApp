import BottomWarning  from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Signin()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleClick()
    {
        const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
            username: email,
            password: password
        });
        if(res.status === 200)
        {
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
            alert("User signed in successfully");
        }
        else
        {
            alert("Invalid credentials");
        }
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox placeholder="dev@gmail.com" label={"Email"} setState={setEmail} />
                    <InputBox placeholder="123456" label={"Password"} setState={setPassword} />
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleClick}/>
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
}
export default Signin;