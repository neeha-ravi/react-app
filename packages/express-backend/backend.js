import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json()); 

const users = { 
    users_list : [
       { 
          id : 'xyz',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Dancer',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
       {
        "id": "qwe123",
        "job": "Zookeeper",
        "name": "Cindy"
        }
    ]
}

function generateRandomId() {
    return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric ID
  }

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

        const addUser = (user) => {
            const id = generateRandomId();
            const newUser = { id, ...user }; // Create a new user object with ID as the first property
            users['users_list'].push(newUser);
            return newUser;
          }
        
          app.post('/users', (req, res) => {
            const userToAdd = req.body;
            const addedUser = addUser(userToAdd);
            res.status(201).json(addedUser);
          });
        
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const deleteUserById = (id) => {
    const index = users['users_list'].findIndex(user => user['id'] === id);
    if (index !== -1) {
        users['users_list'].splice(index, 1);
        return true;  // Indicates the user was found and deleted.
    }
    return false;  // Indicates the user was not found.
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const wasDeleted = deleteUserById(id);

    if (wasDeleted) {
        res.status(204).send();  // No content
    } else {
        res.status(404).send({ message: 'User not found.' });
    }
});

  

app.get('/users', (req, res) => {
    res.send(users);
});
  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

