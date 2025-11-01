import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);
    
    const handleUpdateUser = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const updateUser = {name,email};
         
        /// send data to server 
        fetch(`http://localhost:4000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'Application/json'

            },
            body: JSON.stringify(updateUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                console.log('update user', data);      
                alert('user info updated')
            }
        })
        
    }
    return (
        <div>
            <h3>Updata User</h3>
            <div>
                 <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" id="" defaultValue={user.name} />
                <br />
                <input type="email" name="email" id="" defaultValue={user.email} />
                <br />
                <input type="submit" value="update user" />
            </form>
            </div>
        </div>
    );
};

export default UpdateUser;