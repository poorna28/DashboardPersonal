import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import VisibleParent from './VisibleParent';
import AddParent from './AddParent';
import EditParent from './EditParent';

import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

export default function ParentMain() {
    const [parents, setParents] = useState([]);
    const [visibleShow, setVisibleShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addParent, setAddParent] = useState(false);
    const [editParent, setEditParent] = useState(false);

    useEffect(() => {
        getAllParents();
    }, []);

    const getAllParents = async () => {
        try {
            const response = await axios.get('http://localhost:3035/parents');
            if (response) {
                setParents(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteParent = async (parentId) => {
        try {
            const response = await axios.delete('http://localhost:3035/parents/' + parentId);
            if (response) {
                getAllParents();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteConfirmParent = (parentId) => {
        confirmDialog({
            message: "Are you sure you want to delete this Parent data?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteParent(parentId),
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
                    setEditParent(true);
                }}>
                    <i className="pi pi-user-edit"></i>
                </button>
                <button className='btn btn-danger' onClick={() => deleteConfirmParent(rowData.id)}>
                    <i className="pi pi-trash"></i>
                </button>
            </>
        );
    };

    return (
        <div className="parent-main-page">
            <h1>Parent Management</h1>
            <div className='addbtn'>
                <button className='btn btn-secondary' onClick={() => setAddParent(true)}>
                    Add Parent <i className='pi pi-plus'></i>
                </button>
            </div>
            <div className='main-list'>
                <DataTable value={parents} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="E-Mail"></Column>
                    <Column field="phone" header="Phone"></Column>
                    <Column header="Actions" body={performActions} className='actionsbtn'></Column>
                </DataTable>
            </div>
            <Dialog
                header="View Parent"
                visible={visibleShow}
                style={{ width: '50vw' }}
                onHide={() => setVisibleShow(false)}>
                <VisibleParent parentId={selectedId} />
            </Dialog>
            <Dialog
                header="Add Parent"
                visible={addParent}
                style={{ width: '50vw' }}
                onHide={() => setAddParent(false)}>
                <AddParent setParentAdded={() => {
                    setAddParent(false);
                    getAllParents();
                }} />
            </Dialog>
            <Dialog
                header="Edit Parent"
                visible={editParent}
                style={{ width: '50vw' }}
                onHide={() => setEditParent(false)}>
                <EditParent parentId={selectedId} setParentEdited={() => {
                    setEditParent(false);
                    getAllParents();
                }} />
            </Dialog>
            <ConfirmDialog />
        </div>
    );
}
