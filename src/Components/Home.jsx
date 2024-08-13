import React, {useEffect, useReducer} from 'react';
import {useNavigate} from "react-router-dom";
import {ApiCall} from "../helper/util";
import Todolist from './Todolist';
import TodoForm from './TodoForm';

const Home = () => {
    const navigate = useNavigate();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            todoList:[],
            CurrentTodo:{},
            actionType:""
        }
    )
   const getTodoList=async ()=>{
       let resp = await ApiCall("getTodos", {},"post")
        if (resp.length>0){
            setState({todoList:resp})
        }else{
            setState({todoList:[]})
        }
       setState({actionType:""})
   }
   const verifySession=()=>{
       let SessionObj = JSON.parse(sessionStorage.getItem("SessionObj"));
       if (SessionObj !==null) {
           if (SessionObj.token === "") {
               navigate("/Login")
           }
       }else{
           navigate("/Login")
       }
    }
    useEffect(() => {
        verifySession()
        getTodoList()
    }, []);
    // Delete user
    const handleDelete = async (item) => {
        let resp = await ApiCall("deleteTodo", item, "post")
        getTodoList()
    }
    const handleEdit = (item) => {
        console.log("handleEdit===>",item)
        setState({CurrentTodo:item,actionType:"Edit"})
    }

    return (
        <div className="App">
            <TodoForm
                actionType={state.actionType}
                CurrentTodo={state.CurrentTodo}
                getTodoList={getTodoList}
                todoList={state.todoList}
            />
            <Todolist
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                todoList={state.todoList}
            />
        </div>
    );
};

export default Home;