import { useState } from "react";

 const AddUserForm = (props)=>{
    const initialFormState = {id:null,name:'',username:''}
    const [user,setUser] =  useState(initialFormState);

    const handleInputChange = (event)=>{
       const {name,value} = event.target
   

       setUser({...user,[name]:value})
    }
    return (
    <form onSubmit={
        event => {
            event.preventDefault();
            if(!user.name||!user.username) return;
            props.addUser(user);
            setUser(initialFormState);
        }
    }>
        <label style={{"color":"black"}}>Name</label>
        <input type="text" onChange={handleInputChange} name="name" value={user.name} style={{"color":"black"}} />
        <label style={{"color":"black"}}>Email</label>
        <input type="text" onChange={handleInputChange} name="username" value={user.username} style={{"color":"black"}} />
        <button>Add new user</button>
      </form>
    )
 }

export default AddUserForm;