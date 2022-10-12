
const UserTable = (props)=>(
    <table>
    <thead>
      <tr style={{"color":"black"}}>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody style={{"color":"black"}}>
        {props.users.length>0?(
            props.users.map((user)=>(
                <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>
                        <button onClick={()=>{
                            props.editRow(user)
                        }} className="button muted-button">Edit</button>
                        <button onClick={()=>props.deleteUser(user.id)} className="button muted-button">Delete</button>
                        </td>
                    </tr>

            ))
            ):(
                <tr>
                    <td colSpan={3}>No users</td>
                </tr>
            )
        }
      
    </tbody>
  </table>
);

export default UserTable;