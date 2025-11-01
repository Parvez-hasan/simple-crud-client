import { useState } from "react";
import { use } from "react";
import { Link } from "react-router";

const Users = ({usersPromise}) => {
    const initialUsers = use(usersPromise)
    console.log(initialUsers);
    const [users, setUser] = useState(initialUsers);
    

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const newUser = {name, email}
        
 
        // save this user data to database 
        fetch('http://localhost:4000/users',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
           body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('after saving user data', data);

           if(data.insertedId){
            newUser._id = data.initialUsers;
            const newUsers = [...users, newUser];
            setUser(newUsers)
            alert("users added successfully")
            e.target.reset()
           } 
        })
        
    }
    const handleDeleteUser = (id) => {
        console.log('delete user', id);
        fetch(`http://localhost:4000/users/${id}`, {
             method: 'DELETE'
        }) 
        .then(res => res.json())
        .then(data => {
            console.log('after delete', data);
            if(data.deletedCount){
                alert('deleted successfully')
                const remaining = users.filter( user => user._id !== id);
                setUser(remaining);
            }
            
        })   
        
    }
    return (
        <div>
            <h3>Users : {users.length}</h3>

            <form onSubmit={handleAddUser}>
                <input type="text" name="name" id="" />
                <br />
                <input type="email" name="email" id="" />
                <br />
                <input type="submit" value="add user" />
            </form>
            <div>
                {
                  users.map(user => <p key={user._id}>{user.name} : {user.email}
                  <Link to={`/users/${user._id}`}>Details </Link>
                  <Link to={`/Update/${user._id}`}>. Update</Link>
                  <button onClick={() => handleDeleteUser(user._id)}>x</button>
                  </p>)
                }
            </div>
        </div>
    );
};

export default Users;