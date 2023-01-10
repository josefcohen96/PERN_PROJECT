import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "./WorkPage.css"

import styled from 'styled-components';

function WorksList() {
    // ###################  DISPLAY ALL WORKS ########################

    const [workouts, setWorkouts] = useState([{}]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5000/works", {
                method: "GET",
                headers: { "Content-Type": "application/json" }

            });
            const jsonData = await response.json();

            setWorkouts(jsonData);
        }
        fetchData();
    }, []);


    // ################## ADDING NEW WORK #########################

    const [work, setWork] = useState({
        task_name: "",
        task_id: "",
        product_id: "",
        frequency: ""
    });
    const { task_name, task_id, product_id, frequency } = work
    const onInputChange = e => {
        e.preventDefault();
        setWork({ ...work, [e.target.name]: e.target.value });
    }
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/Works", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(work)

            });
            console.log(work)
            console.log(JSON.stringify(work))
            console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    };
    const Button = styled.button`
    background-color: green;
    color: white;
    font-size: 14px;
    padding: 10px 0px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h3 className="text-center mb-4">Add Work</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter task name"
                                name="task_name"
                                value={task_name}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter task id"
                                name="task_id"
                                value={task_id}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter task id"
                                name="product_id"
                                value={product_id}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" name="frequencyww" value={frequency} onChange={e => onInputChange(e)}
                                >
                                    Daily
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item value={"weekly"}>Weekly</Dropdown.Item>
                                    <Dropdown.Item value={"monthly"}>Monthly</Dropdown.Item>
                                    <Dropdown.Item value={"yearly"}>Yearly</Dropdown.Item>
                                </Dropdown.Menu>

                            </Dropdown>
                        </div>
                        <Button className="btn btn-secondary btn-block">Create Work</Button>
                        <div>
                            <div>
                            </div>
                            <div>
                                <table class="table mt-5 text-center">
                                    <tbody>
                                        <th>Task ID</th>
                                        <th>Task Name</th>
                                        <th>Frequency</th>
                                        <th>Product ID</th>
                                        {workouts.map(work => (
                                            <tr>
                                                <td>{work.task_id}</td>
                                                <td>{work.task_name}</td>
                                                <td>{work.frequency}</td>
                                                <td>{work.product_id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    );
}

export default WorksList;
