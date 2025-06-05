import React, { useState, useEffect } from 'react';
import VisibleUser from './VisibleStudent';
import AddUser from './AddStudent';
import EditUser from './EditStudent';
import api from "../services/api";
import './Student.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Main() {
    const [users, setUsers] = useState([]);
    const [visibleShow, setVisibleShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await api.studentsData();
            if (response) {
                setUsers(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteUser = async () => {
        try {
            const response = await api.deleteStudentsData(deleteId);
            if (response) {
                getAllUsers();
                setShowConfirm(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const openConfirm = (userId) => {
        setDeleteId(userId);
        setShowConfirm(true);
    };

    return (
        <div className="main-page container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Student List</h2>
                <button className="btn btn-primary d-flex align-items-center" onClick={() => setAddUser(true)}>
                    <i className="bi bi-plus me-2"></i> Add Student
                </button>
            </div>
            <div className="main-list shadow rounded bg-white p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle student-table mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Mobile</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-4">
                                        No students found.
                                    </td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile_number}</td>
                                        <td className="text-center">
                                            <button className="btn btn-outline-success btn-sm me-2" title="View"
                                                onClick={() => { setSelectedId(user.id); setVisibleShow(true); }}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-outline-primary btn-sm me-2" title="Edit"
                                                onClick={() => { setSelectedId(user.id); setEditUser(true); }}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" title="Delete"
                                                onClick={() => openConfirm(user.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            <div className={`modal fade ${visibleShow ? "show d-block" : ""}`} tabIndex="-1" style={{ background: visibleShow ? "rgba(0,0,0,0.5)" : "none" }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Student Details</h5>
                            <button type="button" className="btn-close" onClick={() => setVisibleShow(false)}></button>
                        </div>
                        <div className="modal-body">
                            <VisibleUser userId={selectedId} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            <div className={`modal fade ${addUser ? "show d-block" : ""}`} tabIndex="-1" style={{ background: addUser ? "rgba(0,0,0,0.5)" : "none" }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Student</h5>
                            <button type="button" className="btn-close" onClick={() => setAddUser(false)}></button>
                        </div>
                        <div className="modal-body">
                            <AddUser setUserAdded={() => {
                                setAddUser(false);
                                getAllUsers();
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className={`modal fade ${editUser ? "show d-block" : ""}`} tabIndex="-1" style={{ background: editUser ? "rgba(0,0,0,0.5)" : "none" }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Student</h5>
                            <button type="button" className="btn-close" onClick={() => setEditUser(false)}></button>
                        </div>
                        <div className="modal-body">
                            <EditUser userId={selectedId} setUserEdited={() => {
                                setEditUser(false);
                                getAllUsers();
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            <div className={`modal fade ${showConfirm ? "show d-block" : ""}`} tabIndex="-1" style={{ background: showConfirm ? "rgba(0,0,0,0.5)" : "none" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger">Delete Confirmation</h5>
                            <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this student?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className="btn btn-danger" onClick={deleteUser}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


