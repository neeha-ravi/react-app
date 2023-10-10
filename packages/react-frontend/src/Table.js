// src/Table.js
import React from "react";

function TableHeader() {
  return (
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Job</th>
      <th>Action</th>
    </tr>
    </thead>
  );
  }
  
  function TableBody({ characterData, removeCharacter }) {
    return (
      <tbody>
        {characterData.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.job}</td>
            <td>
              <button onClick={() => removeCharacter(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
    

// src/Table.js
function Table (props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} 
	      removeCharacter={props.removeCharacter} />
    </table>
  );
}

export default Table;