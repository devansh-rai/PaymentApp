/* eslint-disable react/prop-types */

import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"

export default function Dashboard()
{
    return <div>
        <Appbar firstname={"hello"}/>
        <div className="m-8">
            <Balance value={"10,000"}/>
            <Users/>
        </div>
    </div>
}