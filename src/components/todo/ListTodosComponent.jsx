import { useEffect, useState } from "react";
import {
  deleteTodoByIdApi,
  retrieveAllTodosforUsernameApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  /*
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const todos = [
    { id: 1, description: "Learn Java", done: false, targetDate: targetDate },
    { id: 2, description: "Study React", done: false, targetDate: targetDate },
    {
      id: 3,
      description: "Practice algorithms",
      done: false,
      targetDate: targetDate,
    },
    { id: 4, description: "Read a book", done: false, targetDate: targetDate },
    { id: 5, description: "Exercise", done: false, targetDate: targetDate },
  ];
  */

  const authContext = useAuth();
  const username = authContext.username;

  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  const [message, setMessage] = useState(null);

  useEffect(() => refreshTodos(), []);

  const refreshTodos = () => {
    retrieveAllTodosforUsernameApi(username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  };

  const updateTodo = (id) => {
    navigate(`/todo/${id}`);
  };

  const deleteTodo = (id) => {
    deleteTodoByIdApi(username, id)
      .then(() => {
        setMessage(`Delete of todo with id = ${id} successfull.`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  };

  const addNewTodo = () => {
    navigate("/todo/-1");
  };

  return (
    <>
      <div className="ListTodoComponent container">
        <h2>Things I need Todo</h2>
        {message && <div className="alert alert-warning">{message}</div>}
        <div>
          <table className="table">
            <thead>
              <tr>
                {/* <th>Id</th> */}
                <th>Description</th>
                <th>Done</th>
                <th>End Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => {
                return (
                  <tr key={todo.id}>
                    {/* <td>{todo.id}</td> */}
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                    <td>{todo.targetDate.toString()}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => updateTodo(todo.id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button className="btn btn-success" onClick={addNewTodo}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default ListTodosComponent;
