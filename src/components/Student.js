import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import VisibleUser from './VisibleUser';
import AddUser from './AddUser';
import EditUser from './EditUser';

import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog'; 

export default function Main() {
    const [users, setUsers] = useState([]);
    const [visibleShow , setVisibleShow] = useState(false);
    const [selectedId , setSelectedId] = useState(null);
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);

    useEffect(()=>{
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3034/users');
            if(response){
                setUsers(response.data);
            }
        } catch(e){
            console.log(e);
        }
    }

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete('http://localhost:3034/users/' + userId);
            if(response){
                getAllUsers(); 
            }
        } catch(e) {
            console.log(e);
        }
    }

    const deleteConfirmUser = (userId) => {
        confirmDialog({
            message: "Are you sure you want to delete this User data?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteUser(userId), 
        });
    }

    const Performactions = (btns) => {
        return (
            <>
                <button className='btn btn-success' onClick={() =>{
                    setSelectedId(btns.id);
                    setVisibleShow(true);
                }}>
                    <i className="pi pi-eye"></i> 
                </button>
                <button className='btn btn-primary' onClick={() =>{
                    setSelectedId(btns.id);
                    setEditUser(true);
                }}>
                    <i className="pi pi-user-edit"></i> 
                </button>
                <button className='btn btn-danger' onClick={() => deleteConfirmUser(btns.id)}>
                    <i className="pi pi-trash"></i> 
                </button>
            </>
        );
    }

    return (
        <div className="main-page">
            <h1>Main Component</h1>
            <div className='addbtn'>
                <button className='btn btn-secondary' onClick={() => setAddUser(true)}>
                    Add-Btn <i className='pi pi-plus'></i>
                </button>
            </div>
            <div className='main-list'>
                <DataTable value={users} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="NAME"></Column>
                    <Column field="email" header="E-MAIL"></Column>
                    <Column field="phone" header="MOBILE"></Column>
                    <Column header="Actions" body={Performactions} className='actionsbtn'></Column>
                </DataTable>
            </div>
            <Dialog 
                header="View-Data"
                visible={visibleShow} 
                style={{ width: '50vw' }}
                onHide={() => setVisibleShow(false)}>
                <VisibleUser userId={selectedId} />
            </Dialog>
            <Dialog 
                header="Add-Data"
                visible={addUser} 
                style={{ width: '50vw' }}
                onHide={() => setAddUser(false)}>
                <AddUser setUserAdded={() => {
                    setAddUser(false);
                    getAllUsers(); 
                }} />
            </Dialog>
            <Dialog 
                header="Edit-Data"
                visible={editUser} 
                style={{ width: '50vw' }}
                onHide={() => setEditUser(false)}>
                <EditUser userId={selectedId} setUserEdited={() => {
                    setEditUser(false);
                    getAllUsers();  
                }} />
            </Dialog>
            <ConfirmDialog />
        </div>
    );
}
