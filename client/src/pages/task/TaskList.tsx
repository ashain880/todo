import React, { Component } from 'react';
import axios from 'axios';
const Swal = require('sweetalert2');

const apiUrl = process.env.REACT_APP_API_URL;

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export default class TaskList extends Component<{}, { tasks: Task[] }>{

    constructor(props: {}) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = async () => {
        try {
            const response = await axios.get(`${apiUrl}tasks`);
            console.log(response.data.data);
            this.setState({ tasks: response.data.data});
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    handleDeleteTask = async (taskId: string) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to delete this?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                await axios.delete(`${apiUrl}tasks/${taskId}`);
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                this.fetchTasks(); // Refresh the task list after deletion
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            Swal.fire('Error', 'An error occurred while deleting the task.', 'error');
        }
    };

    render() {

        const { tasks } = this.state;

        return (
            <div className="TaskList">
                <div className="container mt-5">

                    <a href="/create-task" className="btn btn-success float-end">Add Task</a>
                    <div className="clearfix"></div>

                    <div className="row  mb-5">
                        <div className="col-md-12 mt-3">
                            <div className="card p-0">
                                <div className="card-header">
                                    <h4 className="text-center"><i className="bi bi-check2-square"></i> Task Details</h4>
                                </div>
                                <div className="card-body">

                                    <div className="loading spinner-border text-danger hide"
                                         role="status"><span className="visually-hidden">Loading...</span></div>

                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th align={"left"}>Task Title</th>
                                            <th align={"left"}>Description</th>
                                            <th align={"left"}>Completed</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tasks.map((task) => (
                                            <tr key={task._id}>
                                                <td align={"left"}>{task.title}</td>
                                                <td align={"left"}>{task.description}</td>
                                                <td width={100}>
                                                    <span className={task.completed ? 'show badge bg-success' : 'hide badge bg-success'}>Yes</span>
                                                    <span className={!task.completed ? 'show badge bg-warning' : 'hide badge bg-warning'}>No</span>
                                                </td>
                                                <td width={100}>
                                                    <a className="btn btn-sm btn-info" href={"change-task/"+task._id}>
                                                        <i className="text-white bi bi-pencil-fill"></i>
                                                    </a>
                                                    <button onClick={() => this.handleDeleteTask(task._id)} className="ms-2 btn btn-sm btn-danger">
                                                        <i className="text-white bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        );
    }

}
