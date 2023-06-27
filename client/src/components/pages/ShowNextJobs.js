import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Input, } from "@mui/material";
import Navbar from "../NavBar/NavBar";


const ActiveJobs = () => {
    const [tasks, setTasks] = useState([{}]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:5000/Active_jobs", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data)
            const jsonData = await response.json();

            setTasks(jsonData);
        }
        fetchData();
    }, []);

    return (
        <Box>
            <Navbar />
            <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Task ID</TableCell>
                            <TableCell align="center">Task Name</TableCell>
                            <TableCell align="center">Frequency</TableCell>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">USER_NAME</TableCell>
                            <TableCell align="center">Product ID</TableCell>
                            <TableCell align="center">LOCATION NAME</TableCell>
                            <TableCell align="center">coordinates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {tasks.map(task => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {task.task_id}
                                </TableCell>
                                <TableCell align="center">{task.task_id}</TableCell>
                                <TableCell align="center">{task.begin_date}</TableCell>
                                <TableCell align="center">{task.status}</TableCell>
                                <TableCell align="center">{task.id}</TableCell>
                                <TableCell align="center">{task.user_name}</TableCell>
                                <TableCell align="center">{task.product_id}</TableCell>
                                <TableCell align="center">{task.location_name}</TableCell>
                                <TableCell align="center">{task.coordinates}</TableCell>
                            </TableRow>

                        ))}
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">
                                1
                            </TableCell>
                            <TableCell align="center">train</TableCell>
                            <TableCell align="center">weekly</TableCell>
                            <TableCell align="center">206789165</TableCell>
                            <TableCell align="center">Eyal netanyau</TableCell>
                            <TableCell align="center">12</TableCell>
                            <TableCell align="center">HIT</TableCell>
                            <TableCell align="center">40.7128° N, 74.0060° W</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center" component="th" scope="row">
                                2
                            </TableCell>
                            <TableCell align="center">elivators</TableCell>
                            <TableCell align="center">yearly</TableCell>
                            <TableCell align="center">315346541</TableCell>
                            <TableCell align="center">Yakov cohen</TableCell>
                            <TableCell align="center">13</TableCell>
                            <TableCell align="center">MIT</TableCell>
                            <TableCell align="center">34.0522° N, 118.2437° W</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default ActiveJobs;
