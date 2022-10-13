import AddUserForm from "../forms/AddUserForm";
import EditUserForm from "../forms/EditUserForm";
import UserTable from "../forms/UserTable";
import { useState } from "react";

function Events() {

    const usersData = [
        {id:1,name:'Nanditha',username:'nandy@gmail.com'},
        {id:2,name:'Rochan',username:'srochank@gmail.com'},
        {id:3,name:'Siddharth',username:'sid@gmail.com'},
    ];
    
    const addUser = (user)=>{
        user.id = users.length + 1;
        setUsers([...users,user])
    }
    const deleteUser = (id)=>{
        setUsers(users.filter((user)=>user.id!==id))
        setEditing(false);
    }
    
        const [users,setUsers] = useState(usersData);
        const [editing,setEditing] = useState(false)
        
    
        const initialFormState = {id:null,name:'',username:''}
    
        const [currentUser,setCurrentUser] = useState(initialFormState);
    
        const editRow = (user)=>{
            setEditing(true);
            setCurrentUser({id:user.id,name:user.name,username:user.username});
        }
    
        const updateUser = (id,updatedUser)=>{
            setEditing(false);
            setUsers(users.map((user)=>(user.id===id?updatedUser:user)))
        }
    
      return (
        <div className="container">
      <h1>Come and Join us on our upcoming event!</h1>
      <div style={{"backgroundColor":"#5F9EA0","width":"560px","borderRadius":"10px","padding":"15px"}}>
      <p style={{"color":"black","fontSize":"20px"}}>October drive: This Diwali, Let us say NO to fire crackers</p>
      </div>
      
      <div className="flex-row">
        <div className="flex-large">
            {editing?(<div>
  
                <EditUserForm 
                    setEditing={setEditing}
                    currentUser={currentUser}
                    updateUser={updateUser}
                />
            </div>):(<div>
              <p style={{"color":"black","fontWeight":"bold"}}>Add your name and email id to register!</p>
          <AddUserForm addUser={addUser} />
          </div>
            ) 
        }
        </div>
        <div className="flex-large">
          <p>    </p>
          <UserTable editRow={editRow} deleteUser={deleteUser} users={users} />
        </div>
      </div>
    </div>
      );
    }
    
    export default Events;