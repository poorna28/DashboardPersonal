import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import VisibleEmployee from './VisibleEmployee';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

export default function EmployeeMain() {
    const [employees, setEmployees] = useState([]);
    const [visibleShow, setVisibleShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addEmployee, setAddEmployee] = useState(false);
    const [editEmployee, setEditEmployee] = useState(false);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3036/employees');
            if (response) {
                setEmployees(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteEmployee = async (employeeId) => {
        try {
            const response = await axios.delete('http://localhost:3036/employees/' + employeeId);
            if (response) {
                getAllEmployees();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteConfirmEmployee = (employeeId) => {
        confirmDialog({
            message: "Are you sure you want to delete this Employee data?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteEmployee(employeeId),
        });
    };

    const performActions = (rowData) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    setSelectedId(rowData.id);
                    setVisibleShow(true);
                }}>
                    <i className="pi pi-eye"></i>
                </button>
                <button className='btn btn-primary' onClick={() => {
                    setSelectedId(rowData.id);
                    setEditEmployee(true);
                }}>
                    <i className="pi pi-user-edit"></i>
                </button>
                <button className='btn btn-danger' onClick={() => deleteConfirmEmployee(rowData.id)}>
                    <i className="pi pi-trash"></i>
                </button>
            </>
        );
    };

    return (
        <div className="employee-main-page">
            <h1>Employee Management</h1>
            <div className='addbtn'>
                <button className='btn btn-secondary' onClick={() => setAddEmployee(true)}>
                    Add Employee <i className='pi pi-plus'></i>
                </button>
            </div>
            <div className='main-list'>
                <DataTable value={employees} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="E-Mail"></Column>
                    <Column field="phone" header="Phone"></Column>
                    <Column header="Actions" body={performActions} className='actionsbtn'></Column>
                </DataTable>
            </div>
            <Dialog
                header="View Employee"
                visible={visibleShow}
                style={{ width: '50vw' }}
                onHide={() => setVisibleShow(false)}>
                <VisibleEmployee employeeId={selectedId} />
            </Dialog>
            <Dialog
                header="Add Employee"
                visible={addEmployee}
                style={{ width: '50vw' }}
                onHide={() => setAddEmployee(false)}>
                <AddEmployee setEmployeeAdded={() => {
                    setAddEmployee(false);
                    getAllEmployees();
                }} />
            </Dialog>
            <Dialog
                header="Edit Employee"
                visible={editEmployee}
                style={{ width: '50vw' }}
                onHide={() => setEditEmployee(false)}>
                <EditEmployee employeeId={selectedId} setEmployeeEdited={() => {
                    setEditEmployee(false);
                    getAllEmployees();
                }} />
            </Dialog>
            <ConfirmDialog />
        </div>
    );
}
