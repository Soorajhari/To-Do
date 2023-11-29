import React, { useState, useEffect, useRef } from "react";
import "../todo.css";
import { CiEdit } from "react-icons/ci";
import { IoMdDoneAll } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

const Todo = () => {
  const [input, setinput] = useState("");
  let [todos, settodos] = useState([]);
  const[editId,setEditId] =useState(0)

const addTodo = () => {
  if (input.trim() !== '') {
    const isDuplicate = todos.some((item) => item.list === input.trim());
    
    if (!isDuplicate) {
      if (editId) {
        const editTodo = todos.find((item) => item.id === editId);
        const update = todos.map((item) =>
          item.id === editTodo.id ? { id: item.id, list: input } : item
        );
        settodos(update);
        setEditId(0);
        setinput('');
      } else {
        settodos([...todos, { list: input, id: Date.now(), status: false }]);
        setinput('');
      }
    } else {
      window.alert("This todo is already in the list!");
    }
  }
};

  const handleform = (e) => {
    e.preventDefault();
  };

  const onDelete = (id) => {

    settodos(todos.filter((item) => item.id !== id));
  };

  const onEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    if (itemToEdit) {
      setinput(itemToEdit.list);
      setEditId(itemToEdit.id)
    }

  };
  

  const onComplete = (id) => {
    let complete = todos.map((item)=>{
        if(item.id===id){
            return({
                ...item,status:!item.status
            })
        }
        return item
    })
    settodos(complete)
  };

  const inputRef = useRef("null");
  console.log(inputRef)

  useEffect(() => {
    inputRef.current.focus();
  });

   const handleDelete =()=>{
    settodos(todos=[])
   }


  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="forms" onSubmit={handleform}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
        <button onClick={()=>addTodo()}>{editId ? 'EDIT' : 'ADD'}</button>
        
      </form>
     
      <div>

        <ul className="list">
          {todos.map((item) => {
            return (
              <li className="list-items">
                <div className="list-item-list" id={item.status ? 'list-item' : '' }>
                  {item.list}
                </div>

                <span>
                  <IoMdDoneAll
                    className="list-item-icons"
                    id="comp"
                    title="complete"
                    onClick={() => onComplete(item.id)}
                  />
                  <CiEdit className="list-item-icons" id="edit" title="edit" onClick={()=>onEdit(item.id)} />
                  <AiFillDelete
                    className="list-item-icons"
                    id="delete"
                    title="delete"
                    onClick={() => onDelete(item.id)}
                  />
                </span>
              </li>
            );
          })}
        </ul>

        <button className="del" onClick={handleDelete}>Delete All</button>
      </div>
    </div>
  );
};

export default Todo;
