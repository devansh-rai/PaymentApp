/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

export default function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>           {/*this is a Link tag */} 
        {buttonText}
      </Link>
    </div>
}