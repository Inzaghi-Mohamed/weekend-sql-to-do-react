import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'; 
function App () {


  // It's always good to set an initial value to be a "blank" value of the same type you expect.
  const [todoList, setTodoList] = useState([]);
 

  // This will help in POST
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState('');
``



  // useEffect is a new hook
  // It takes in two things:
  // 1) A callback function to run
  //    It runs the callback when the component loads, and this is mostly what we use it for
  // 2) A list of variables to watch, when any of them change value, it will rerun the callback function
  //    Most of the time, this ends up being an empty list, but don't forget it or weird things happen!
  useEffect(() => {
    fetchTodo();
  }, [])

  // This function helps in fetching data from the DB
  function fetchTodo(){
    axios.get('/api/todo')
    .then((response)=>{
    console.log(response);
    console.log(response.data);
    setTodoList(response.data)

    }).catch((error)=>{
      console.log('GET req was not succeful', error)
    })
  }

  // End of GET

  const addTodo = (event) => {
    // When We hit submit button in a form, we need to stop the page from refreshing
    event.preventDefault();

    // We pack up our data
    const newTodo = {
      title: newTodoTitle,
      description: newTodoDescription,
      priority: newTodoPriority
      
    }

    // We send it to the server
    axios.post('/api/todo', newTodo)
      .then((response) => {
        console.log(response);

        // Clear out the inputs, for the next todo to be added.
        setNewTodoTitle('');
        setNewTodoDescription('');
        setNewTodoPriority('');

        // Fetch the updated list from the server
        fetchTodo();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
  return (
    <div>
      <h1>My Todo</h1>

     <div className='form-container'>
     <form onSubmit={addTodo}>
        {/* In JSX, we use the attribute 'htmlFor' instead of 'for' on our labels */}
        <label htmlFor="title">Title:</label> <br />
        {/* Each input has an onChange listner, which will set our react variable when the fields contents are changed */}
        {/* We also set the value of that field to be the react variable.  That way, when we update the variable in other places, */}
        {/* (ike clearing it out after a post) we see the field change on the screen. */}
        <input id="title" onChange={(event) => setNewTodoTitle(event.target.value)} value={newTodoTitle} /> <br />
       

        <label htmlFor="description">Description:</label> <br />
        <input id="description" onChange={(event) => setNewTodoDescription(event.target.value)} value={newTodoDescription} /> <br />
       
        <label htmlFor="priority">Priority:</label> <br />
        <input id="priority" onChange={(event) => setNewTodoPriority(event.target.value)} value={newTodoPriority} /> <br />
  

        <button type="submit">Add Todo</button>
      </form>
     </div>

    {/* Display TODO's below here! */}
    <div className='todo-container'>
    <ul>
        {todoList.map(
          function (todo) {
            // Every list item must have a unique key
            // This purely for react to be able to keep track of things behind the scenes.
            // We started out using creature.name, but once we introduced the server we can change it to
            // creature.id, which is guarenteed to be truely unique.
            return ( 
            
               <li key ={todo.id}>
                <p><legend>Title:</legend><br></br> {todo.title}</p> 
                <p> <legend>Description:</legend> <br></br>{todo.description}</p> 
                <p><legend>Priority:</legend><br></br> {todo.priority}</p>
            
              <div className='buttons'>
               <button className='edit-btn'>Edit</button>
               <button>Save</button>
              <button className='delete-btn'>Delete</button>
             </div>
            </li> 
              
            );
          }
        )}
      </ul>
    </div>
    </div>
  );

}

export default App
