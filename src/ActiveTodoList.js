import React, { useState, useEffect, forwardRef, createRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ActiveTodoList = () => {

    const [activeTasks, setActiveTasks] = useState([]);
    useEffect(() => {
        console.log("Effect has been run");
        getActiveTasks();
    }, []);
    const getActiveTasks = async () => {
        //add await every time we have a promise
        const response = await fetch(
            `/todos/active`
        );
        const data = await response.json();
        console.log(data);
        setActiveTasks(data);
    };

    const [state] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Type', field: 'reccurence' },
            { title: 'Category', field: 'category' },
            { title: 'Percentage', field: 'percentage', type: 'numeric' },
            { title: 'Goal', field: 'goal', type: 'numeric' },
            { title: 'Monday', field: 'completion.monday', type: 'boolean' },
            { title: 'Tuesday', field: 'completion.tuesday', type: 'boolean' },
            { title: 'Wednesday', field: 'completion.wednesday', type: 'boolean' },
            { title: 'Thursday', field: 'completion.thursday', type: 'boolean' },
            { title: 'Friday', field: 'completion.friday', type: 'boolean' },
            { title: 'Saturday', field: 'completion.saturday', type: 'boolean' },
            { title: 'Achieved', field: 'achieved', type: 'boolean' },
        ]
    });
    const updateTask = async (payload) => {
        //add await every time we have a promise
        const baseUrl = "/todos/" + payload.id;
        await fetch(
            baseUrl,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            }
        );
        getActiveTasks();
    };
    const deleteTask = async (payload) => {
        //add await every time we have a promise
        const baseUrl = "/todos/" + payload.id;
        await fetch(
            baseUrl,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        getActiveTasks();
    };

    const createTask = async (payload) => {
        //add await every time we have a promise
        const baseUrl = "/todos"
        await fetch(
            baseUrl,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: '{"name":"' + payload.name + '", "goal":' + payload.goal + ',"category":"' + payload.category + '","reccurence":"' + payload.reccurence + '", "weekNr": 0}'

            }
        );
        getActiveTasks();
    };

    return (
        <MaterialTable
            icons={tableIcons}
            title="Weekly tasks"
            columns={state.columns}
            data={activeTasks}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            createTask(newData);
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>

                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            updateTask(newData);
                        }, 600);
                    }).then(),

                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            deleteTask(oldData);
                        }, 600);
                    }),
            }
            }
        />
    );
};

export default ActiveTodoList;