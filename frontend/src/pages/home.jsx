import { useEffect, useState } from "react"
import Contact from "../components/Contact"

const constStates = {
    addNew : "addNew",
    display : "display",
    initial : "initial"
}

export default function Home(){
    const [contacts,updateContacts] = useState([])
    const [selectedState,updateSelecteState] = useState(constStates.initial)
    const [input,updateInput] = useState('')
    const [email,updateEmail] = useState('')
    const [phone,updatePhone] = useState('')
    useEffect(() => {
        fetch('http://localhost:9000/api/contact/contacts')
        .then((response) => response.json())
        .then((result) => updateContacts(result))
        .catch((error) => console.log(error))
    },[])
    const onClickSubmit = async(e) => {
        e.preventDefault()
        if(input === '' || email === '' || phone === ''){
            alert("please enter valid info")
            return;
        }
        const body = {
            id:2,
            name : input,
            email:email,
            phone : phone
        }
        const response = await fetch("http://localhost:9000/api/contact/register",{
            method:'POST',
            body:JSON.stringify(body)

        })
    }
    return (
        <div>
            <div className="text-white bg-gray-800 flex justify-center pl-5 py-4 font-bold flex-col ">
                <h1 className="text-[20px] ">Contacts</h1>
                <p className="text-[14px] ">View and manage your contacts</p>
            </div>
            <div className="flex">
                <div className="bg-gray-300 w-[20%] h-[90vh] overflow-y-auto " >
                        <div className="flex justify-between py-5 ">
                        <h1 className="flex pl-2">List of Contacts</h1>
                        <button onClick={()=>updateSelecteState(constStates.addNew)} className="bg-blue-600 text-white">Add new contact</button>
                        </div>
                        <div>
                            {contacts.length>0 ? (
                                contacts.map(eachContact => (
                                    <Contact contactDetails={eachContact} />
                                ))
                            ):(
                                <p>No Contacts available</p>
                            )}
                        </div>
                </div>
                <div className="flex justify-center items-center w-[80%] ">
                    {selectedState === constStates.initial && (
                        <h1>No contact selected</h1>
                    )}
                    {selectedState === constStates.addNew && (
                        <form className="flex flex-col space-y-3 ">
                            <p>Enter contact details</p>
                            <input className="h-[30px] border border-gray-500" type="text" placeholder="enter name" value={input} onChange={(e)=>updateInput(e.target.value)} />
                            <input className="h-[30px] border border-gray-500" type="email" placeholder="enter email" value={email} onChange={(e)=>updateEmail(e.target.value)} />
                            <input className="h-[30px] border border-gray-500" type="text" placeholder="enter phone number" value={phone} onChange={(e) => updatePhone(e.target.value)} />
                            <button onClick={onClickSubmit} className="bg-blue-700 rounded text-white ">Add Contact</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}