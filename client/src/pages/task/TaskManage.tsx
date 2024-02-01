import React, { Component, ChangeEvent, FormEvent, useEffect} from 'react';
import axios from 'axios';
const $ = require('jquery')
const Swal = require('sweetalert2');

const apiUrl = process.env.REACT_APP_API_URL;

interface TaskListState {
    id: string;
    title: string;
    description: string;
    completed:string;
}

export default class TaskManage extends Component<{}, TaskListState>{

    constructor(props: {}) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            completed:'',
        };
    }

    componentDidMount() {
        const currentURL = window.location.href;
        let parts = currentURL.split("/"),
        lastPart = parts[parts.length-1];
        if(lastPart != "create-task"){
            this.fetchTasks(lastPart);
        }
    }

    fetchTasks = async (id: string) => {
        try {
            const response = await axios.get(`${apiUrl}task/${id}`);
            console.log(response.data.data);
            this.setState({
                id:id,
                title: response.data.data.title,
                description:  response.data.data.description,
                completed: response.data.data.completed
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    handleSelectChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { id, title, description, completed } = this.state;

        if (!title && !description) {
            Swal.fire('Oops!', 'Please fill the required fields', 'error');
            return;
        }

        try {
            if (id) {
                // Update existing task if id is present
                await axios.put(`${apiUrl}tasks/${id}`, {
                    title: title,
                    description: description,
                    completed: completed,
                });
                Swal.fire('Success!', 'Task updated successfully', 'success').then((result: any) => {
                    window.location.href="/tasks";
                });

            } else {
                // Create a new task if id is null
                await axios.post(`${apiUrl}tasks`, {
                    title: title,
                    description: description
                });
                Swal.fire('Success!', 'Task created successfully', 'success').then((result: any) => {
                    window.location.href="/tasks";
                });
            }

            // Clear the form fields after task creation or update
            this.setState({
                id: '',
                title: '',
                description: '',
            });
        } catch (error) {
            console.error('Error creating/updating task:', error);
        }
    };

    render() {

        const {id ,title, description, completed} = this.state;

        return (
            <div className="TaskManage">

                <div className="container mt-5">

                    <div className="row justify-content-center mb-0">
                        <div className="col-md-6">
                            <div className="card p-0">
                                <div className="card-header">
                                    <h4 className="text-center pr-title"><i className="bi bi-check2-square"></i> Create Task</h4>
                                </div>
                                <div className="card-body">

                                    <form id="taskForm" onSubmit={this.handleFormSubmit}>

                                        <div className={(id)?' mb-3':'hide mb-3'}>
                                            <div className="text-left form-label">ID: {id}</div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="text-left form-label">Title <span className="star">*</span></div>
                                            <input type="text" className="form-control" id="title" name="title" value={title} onChange={this.handleInputChange} />
                                        </div>

                                        <div className="mb-3">
                                            <div className="text-left form-label">Description <span className="star">*</span></div>
                                            <textarea className="form-control" id="description" name="description" value={description}  onChange={this.handleInputChange} rows={8}></textarea>
                                        </div>

                                        <div className={(id)?'mb-3':'hide mb-3'}>
                                            <div className="text-left form-label">Completed <span className="star">*</span></div>
                                            <select className="form-control" id="completed" name="completed" value={completed} onChange={this.handleSelectChange} >
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>

                                        <div className="">
                                            <div className="float-end">
                                                <button type="submit" className="btn btn-success m-2">SUBMIT</button>
                                                <a href="/tasks" className="btn btn-dark m-2">CANCEL</a>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
