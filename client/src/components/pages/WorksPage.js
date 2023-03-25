import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "./WorkPage.css"
import Navbar from "../NavBar/NavBar";
import {
    Box,
    Button,
    FormControl,
    Input,
    Typography,
} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function WorksList() {
    // ###################  DISPLAY ALL WORKS ########################

    const [workouts, setWorkouts] = useState([{}]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5000/works", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            console.log(response)
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
    const { task_name, task_id, frequency } = work
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

    return (
        <Box >
            <Navbar />
            <Box sx={{ alignItems: "center", width: "100%", pt: 5 }} className="container">
                <FormControl
                    sx={{ gap: 2, width: "80%", pb: 4, pl: 25 }}
                >
                    <Typography sx={{ textAlign: "center" }} variant="h3">
                        Add Work
                    </Typography>

                    <Box className>
                        <Input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter task name"
                            name="task_name"
                            value={task_name}
                            onChange={e => onInputChange(e)}
                        />
                    </Box>
                    <Box className>
                        <Input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter task id"
                            name="task_id"
                            value={task_id}
                            onChange={e => onInputChange(e)}
                        />
                    </Box>
                    <Box className>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" name="frequency" value={frequency} onChange={e => onInputChange(e)}
                            >
                                {work.frequency ? work.frequency : "Daily"}

                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item value={"Daily"} onClick={() => setWork({ ...work, frequency: "Daily" })} >Daily</Dropdown.Item>
                                <Dropdown.Item value={"Weekly"} onClick={() => setWork({ ...work, frequency: "weekly" })} >Weekly</Dropdown.Item>
                                <Dropdown.Item value={"Monthly"} onClick={() => setWork({ ...work, frequency: "monthly" })} >monthly</Dropdown.Item>
                                <Dropdown.Item value={"Yearly"} onClick={() => setWork({ ...work, frequency: "yearly" })} >yearly</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    </Box>
                    <Button onSubmit={e => onSubmit(e)} >Create Work</Button>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Task ID</TableCell>
                                    <TableCell align="center">Task Name</TableCell>
                                    <TableCell align="center">Frequency</TableCell>
                                    <TableCell align="center">Product ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {workouts.map(work => (
                                    <TableRow
                                        key={work.task_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {work.task_id}
                                        </TableCell>
                                        <TableCell align="center">{work.task_name}</TableCell>
                                        <TableCell align="center">{work.frequency}</TableCell>
                                        <TableCell align="center">{work.product_id}</TableCell>
                                    </TableRow>

                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </FormControl>
            </Box>
        </Box >
    );
}

export default WorksList;
