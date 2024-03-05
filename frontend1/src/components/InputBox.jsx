/* eslint-disable react/prop-types */


export default function InputBox({label, placeholder, setState}) {

    function handlechange(e){
        // console.log(e.target.value)
        setState(e.target.value)
    }

    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" onChange={handlechange}/>
        </div>
    )
}