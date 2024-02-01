// client/src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import TaskList from "./pages/task/TaskList";
const Routes = () => {
    return (
        <Routes>
            <Route path="/" element={<TaskList />} />
        </Routes>
    )
};

export default Routes;