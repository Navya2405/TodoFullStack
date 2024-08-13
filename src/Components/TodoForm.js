import React, {useEffect, useReducer} from 'react';
import {ApiCall} from "../helper/util";

const TodoForm = ({getTodoList, todoList, actionType, CurrentTodo}) => {
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            todoDetails: {
                todo: "",
                priority: "",
                status: ""
            },
            fieldError: false,
        }
    )
    useEffect(() => {
        if (actionType === "Edit") {
            setState({todoDetails: JSON.parse(JSON.stringify(CurrentTodo))})
            // to prevent mutation orignal obj
            // setState({todoDetails: CurrentTodo})
        }
    }, [actionType,CurrentTodo]);

    const handleChangeInput = (e, name) => {
        let todoDetails = state.todoDetails
        todoDetails[name] = e.target.value
        setState({todoDetails})
    }
    const handleSubmit = async () => {
        let todoDetails = state.todoDetails
        setState({fieldError: false})
        if (todoDetails.todo !== "" && todoDetails.priority !== "" && todoDetails.status !== "") {
            setState({fieldError: false})
            let apiRoute="addTodo"
            if (actionType==="Edit"){
                apiRoute="updateTodo"
            }
            let resp = await ApiCall(apiRoute, state.todoDetails, "post")
            let todoDetails = {
                todo: "",
                priority: "",
                status: ""
            }
            setState({todoDetails})
            getTodoList()
        } else {
            setState({fieldError: true})
        }
    };
    return (
        <div>
            <div className="userForm">
                <h2>Add/Update To-Do</h2>

                <label htmlFor="fname">Todo</label>
                <div className="flex mb-10 ">

                    <textarea className="w-full" rows={5} value={state.todoDetails.todo}
                              onChange={(e) => handleChangeInput(e, "todo")}/>
                </div>


                <label htmlFor="lname">Priority</label>

                <div className="select-dropdown mb-10 ">
                    <select className="w-full" value={state.todoDetails.priority}
                            onChange={(e) => handleChangeInput(e, "priority")}>
                        <option value="">select</option>
                        <option value="High">High</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <label htmlFor="lname">Status</label>

                <div className="select-dropdown mb-10">
                    <select className="w-full" value={state.todoDetails.status}
                            onChange={(e) => handleChangeInput(e, "status")}>
                        <option value="">select</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button onClick={handleSubmit}>Add Todo</button>
                {state.fieldError && <div>
                    <p className="clrRed">Fill All the fields!</p>
                </div>}

            </div>
        </div>
    );
};

export default TodoForm;
