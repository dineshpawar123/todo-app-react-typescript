import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editSingleValue, setEditSingleValue] = useState<string>("");
  const [editSingleValueId, setEditSingleValueId] = useState<number>(0);
  const [todosdone, setTodosDone] = useState<Todo[]>([]);
  console.log("todosdone", todosdone);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo)
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
    setTodo("");
  };

  const handleDone = (data: Todo) => {
    setTodos(
      todos.map((value) => {
        console.log("value.id", value.id, "data.id", data.id);
        return value.id == data.id
          ? { ...value, isDone: !value.isDone }
          : value;
      })
    );
  };

  const handleEdit = (data: Todo) => {
    setIsEdit(true);
    setEditSingleValue(data.todo);
    setEditSingleValueId(data.id);
  };

  const handleSingleValueEdit = (e: any) => {
    e.preventDefault();

    setTodos(
      todos.map((value) => {
        return value.id == editSingleValueId
          ? { ...value, todo: editSingleValue }
          : value;
      })
    );

    setIsEdit(false);
    setEditSingleValue("");
    setEditSingleValueId(0);
  };

  const handleDelete = (data: Todo) => {
    setTodos(
      todos.filter((value) => {
        return value.id != data.id;
      })
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>MY TODO App</h1>
      <form onSubmit={handleSingleValueEdit}>
        {isEdit && (
          <div>
            <b>Enter value to edit : </b>{" "}
            <input
              value={editSingleValue}
              onChange={(e) => {
                setEditSingleValue(e.target.value);
              }}
              style={{ height: "40px", width: "30%", border: "2px solid blue" }}
            />
            <button
              style={{
                height: "30px !important",
                color: "white",
                border: "2px solid blue",
                backgroundColor: "blue",
                padding: "13px",
                marginLeft: "30px",
              }}
              type="submit"
            >
              save
            </button>
            <br />
            <br />
          </div>
        )}
      </form>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <br />
      <br />

      <table>
        <tr>
          <th style={{ textAlign: "center" }}>Index</th>
          <th style={{ textAlign: "center" }}>TODO Item</th>
          <th style={{ textAlign: "center" }}>Action</th>
        </tr>
        {todos.map((data,i) =>
          !data.isDone ? (
            <tr>
              <td>{i+1}</td>
              <td style={{ width: "70%", textAlign: "center" }}>{data.todo}</td>
              <td>
                {" "}
                <div style={{ color: "white",display:'flex',justifyContent:'space around'}}>
                  <button
                    style={{
                      backgroundColor: "yellow",
                      padding: "8px",
                      border: "none",
                      borderRadius: "10px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      handleEdit(data);
                    }}
                  >
                    edit
                  </button>
                  <button
                    style={{
                      backgroundColor: "red",
                      padding: "5px",
                      marginRight: "5px",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                    }}
                    onClick={() => handleDelete(data)}
                  >
                    delete
                  </button>

                  <button
                    style={{
                      backgroundColor: "green",
                      padding: "5px",
                      marginRight: "5px",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                    }}
                    onClick={() => handleDone(data)}
                  >
                    done
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            ""
          )
        )}
      </table>
<br/><br/>
      <h1 style={{color:'red'}}>List Of Done Items : </h1>
      <table>
        <tr>
          <th style={{ textAlign: "center" }}>TODO Item</th>
        </tr>
        {todos.map((data) =>
          data.isDone ? (
            <tr>
              <td style={{ width: "80%", textAlign: "center" }}>{data.todo}</td>
            </tr>
          ) : (
            ""
          )
        )}
      </table>
    </div>
  );
};

export default App;
