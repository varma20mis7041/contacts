const Contact = ({contactDetails}) => {
    const {id,name,email,phone} = contactDetails
    const onClickDelete = async() => {
        try{
            await fetch(`http://localhost:9000/api/contact/delete-contact/${id}`)
        }catch(error){
            console.log("Error in deleting user")
        }
    }
    return (
        <div className="bg-gray-800 text-white ">
            <div className="flex ">
                <div className="h-full pt-5 pr-5 flex justify-center ">
                    <p className="bg-sky-500 flex justify-center items-center h-[30px] w-[30px] rounded-full">{name.charAt(0).toUpperCase()}</p>
                </div>
                <div>
                <h1>{name}</h1>
            <h1>{email}</h1>
            <h1>{phone}</h1>
                </div>
                <div>
                    <button onClick={onClickDelete} className="bg-red-600 text-white ">delete</button>
                </div>
            </div>
        </div>
    )
}

export default Contact