// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
	const [characters, setCharacters] = useState([]);
 

	function removeOneCharacter (index) {
        const userToDelete = characters[index];
        fetch(`http://localhost:8000/users/${userToDelete.id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.status === 204) {  // Successfully deleted
                const updated = characters.filter((character, i) => {
                    return i !== index;
                });
                setCharacters(updated);
                console.log('Successfully deleted the user.');
            } else {
                console.error('Failed to delete user.');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

	function updateList(person) { 
		postUser(person)
		  .then(() => setCharacters([...characters, person]))
		  .catch((error) => {
			console.log(error);
		  })
	}

	function postUser(person) {
		const promise = fetch("Http://localhost:8000/users", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(person),
		});
	
		return promise;
	  }


	function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
	}

	function updateList(person) {
		postUser(person)
		.then((response) => {
			if (response.status === 201) {
			  // The user was successfully created (201 - Content Created)
			  // You can update the frontend state or display a success message
			  console.log('User created successfully');
			} else {
			  // Handle other status codes as needed
			  console.error('User creation failed with status code: ' + response.status);
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  }
	  

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	  }, [] );
  
return (
  <div className="container">
    <Table characterData={characters} 
	    removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />

  </div>
)

}

export default MyApp;
