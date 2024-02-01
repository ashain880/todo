import React, { Component } from 'react';

export default class Dashboard extends Component {

    render() {
        return (
            <div className="container mt-5">

                <div className="row justify-content-center mb-5">
                    <div className="col-md-8">
                        <div className="row" style={{marginTop: "80px"}}>

                            <div className="col-lg-6 col-md-6 mt-2 mb-1">
                                <div className="card box-border">
                                    <div className="card-body">
                                        <h5 className="text-center card-title">Tasks List</h5>
                                        <p className="text-center card-text">View all to-do tasks</p>
                                        <div className="col text-center">
                                            <a style={{padding: "5px 30px", fontSize: "18px"}} className="align-items-center btn btn-lg btn-dark"
                                               aria-current="page" href="/tasks">Visit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 mt-2 mb-1">
                                <div className="card box-border">
                                    <div className="card-body">
                                        <h5 className="text-center card-title">Create Task</h5>
                                        <p className="text-center card-text">Add new to-do task</p>
                                        <div className="col text-center">
                                            <a style={{padding: "5px 30px", fontSize: "18px"}} className="align-items-center btn btn-lg btn-dark"
                                               aria-current="page" href="/create-task">Visit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
