import React, { Component }  from 'react';
import Nav from "./common/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TaskList from "./task/TaskList";
import TaskManage from "./task/TaskManage";
import Dashboard from "./task/Dashboard";

export default class Main extends Component {
    render() {
        return (
                <>
                    <html lang="en">
                    <head>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <title>TODO LIST</title>
                    </head>
                    <body>
                    <Nav />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/tasks" element={<TaskList />} />
                            <Route path="/create-task" element={<TaskManage />} />
                            <Route path="/change-task/:id" element={<TaskManage />} />
                        </Routes>
                    </BrowserRouter>
                    </body>
                    </html>
                </>
            );
    }
}
