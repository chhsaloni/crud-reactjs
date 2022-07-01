import React, { Component } from 'react'
import UserConsumer from "../context";
import axios from 'axios';

class UpdateUser extends Component {

    state = {
        name: '',
        department: '',
        salary: '',
        error: false
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.department]: e.target.value,
            [e.target.salary]: e.target.value
        })
    }
    validateform = () => {
        const { name, salary, department } = this.state;
        if (name === "" || salary === "" || department === "")
            return false;
        return true;
    }
    updateUser = async (dispatch, e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const { name, salary, department } = this.state;
        //Update 
        const updatedUser = {
            name,
            salary,
            department
        }
        if (!this.validateform()) {
            this.setState({ error: true });
            return;
        }
        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser);
        dispatch({ type: "UPDATE_USER", payload: response.data });

        //Redirect
        this.props.history.push('/');

    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        const { name, salary, department } = response.data;
        this.setState({
            name: name,
            salary: salary,
            department: department
        })
    }

    render() {
        const { name, department, salary ,error} = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            // <div >Test</div>
                            <div className="col-md-8 mb-4">



                                <div className="card">
                                    <div className="card-header">
                                        <h4 > Update User Form </h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            error
                                                ? <div className="alert alert-danger">Lütfen bilgilerinizi kontrol edin</div>
                                                : null
                                        }
                                        <form onSubmit={this.updateUser.bind(this, dispatch)}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text"
                                                    name="name"
                                                    id="id"
                                                    className="form-control"
                                                    value={name}
                                                    onChange={this.changeInput}
                                                    placeholder="Enter Name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="department">Department</label>
                                                <input type="text"
                                                    name="department"
                                                    id="department"
                                                    className="form-control"
                                                    value={department}
                                                    onChange={this.changeInput}
                                                    placeholder="Enter Department" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="salary">Salary</label>
                                                <input type="text"
                                                    name="salary"
                                                    id="salary"
                                                    className="form-control"
                                                    value={salary}
                                                    onChange={this.changeInput}
                                                    placeholder="Enter Salary" />
                                            </div>
                                            <button className="btn btn-danger btn-block" type="submit">Update User</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        );
                    }
                }
            </UserConsumer>
        )



    }
}
export default UpdateUser;