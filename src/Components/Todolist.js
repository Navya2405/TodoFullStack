
import React from 'react';
const Todolist = ({ todoList,handleEdit,handleDelete }) => {
  return (
      <div className="mt-40">
      <div className="userTable">
          <h2>To-Do List</h2>
          <table className="my_table">
              <tr>
                  <th>Todo</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
              {todoList.map((user, index) => (
                  <tr key={index}>
                      <td>{user.todo}</td>
                      <td>{user.priority}</td>
                      <td>{user.status}</td>
                      <td>
                          <div className="flex">
                              <button  onClick={()=>handleDelete(user)} className="mr-5">Delete</button>
                              <button onClick={()=>handleEdit(user)}>Edit</button>
                          </div>
                      </td>
                  </tr>
              ))}

          </table>
      </div>
      </div>
  );
};

export default Todolist;
