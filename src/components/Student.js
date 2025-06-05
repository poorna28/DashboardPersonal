import React, { useState, useEffect } from 'react';
import VisibleUser from './VisibleStudent';
import AddUser from './AddStudent';
import EditUser from './EditStudent';
import api from "../services/api";
import './Student.css';

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
        <div className="main-page">
            <h1>Main Component</h1>
            <div className='addbtn mb-3 text-end'>
                <button className='btn btn-secondary' onClick={() => setAddUser(true)}>
                    Add-Btn <i className='bi bi-plus'></i>
                </button>
            </div>
            <div className='main-list'>
                <table className="table table-striped student-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>MOBILE</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile_number}</td>
                                <td className="student-actions">
                                    <button className='btn btn-success' onClick={() => {
                                        setSelectedId(user.id);
                                        setVisibleShow(true);
                                    }}>
                                        <i className="bi bi-eye"></i>
                                    </button>
                                    <button className='btn btn-primary' onClick={() => {
                                        setSelectedId(user.id);
                                        setEditUser(true);
                                    }}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className='btn btn-danger' onClick={() => openConfirm(user.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <div className={`modal fade ${visibleShow ? "show d-block" : ""}`} tabIndex="-1" style={{ background: visibleShow ? "rgba(0,0,0,0.5)" : "none" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View-Data</h5>
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
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add-Data</h5>
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
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit-Data</h5>
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
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation</h5>
                            <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this User data?</p>
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


