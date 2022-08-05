import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useForm } from 'react-hook-form';

import 'bootstrap/dist/css/bootstrap.min.css';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { FiEdit2 } from 'react-icons/fi';
import api from '../../services/api';
import { toast } from 'react-toastify';

import { Container, InputContainer, TasksContainer, LogoutContainer } from './styles';

function Dashboard ({authenticated, setAuthenticated}) {
    const [tasks, setTasks] = useState([]);

    const [token] = useState(JSON.parse(localStorage.getItem("@Doit:token")) || "");
    console.log(token);

    const { register, handleSubmit, formState } = useForm();

    const { isSubmitting } = formState;    

    function loadTasks () {
        api.get('/task', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                completed: false,
            }
        })
        .then((response) => {
            const apiTasks = response.data.data.map((task)=> ({
                ...task,
                createdAt: new Date (task.createdAt).toLocaleDateString("pt-BR", {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }),
            }));
            setTasks(apiTasks);
        })
        .catch((err) => console.log(err));
    }

    useEffect(()=> {
        loadTasks();
    }, [])

    const onSubmit = ({ task }) => {
        if (!task) {
            return toast.error('Complete the field to send a task');
        }

        return new Promise((resolve)=> {
            setTimeout(()=> 
                resolve(
                    api.post(
                        "/task",
                        {
                        description: task,
                        }, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        
                        }
                    ).then((response)=> loadTasks())
                )
            ,)
        });
    }

    const handleCompleted = (id) => {
        const newTasks = tasks.filter((task) => task._id !== id);
        api
            .put(
                `/task/${id}`,
                { completed: true},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
        )
        .then(response => setTasks(newTasks));
    }

    const logout = () => {
        
        setAuthenticated(false);
        localStorage.clear();
        toast.success('User successfully logged off');
    }
    
    if (!authenticated) {
        return <Redirect to='/login'/>
    }

    const actualDate = new Date();

    return (
        <Container>
            <LogoutContainer>
                <Button onClick={logout}>Logout</Button>
            </LogoutContainer>
            <InputContainer onSubmit={handleSubmit(onSubmit)}>
                <time> {actualDate.toLocaleDateString("pt-BR", {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })} </time>
                <section>
                    <Input
                        icon = {FiEdit2}
                        placeholder = 'Nova Tarefa'
                        register = {register}
                        name = 'task'
                    />
                    <Button
                        disabled = {isSubmitting}
                        type='submit'
                    >
                    {isSubmitting ? 
                    (<span className="spinner-border spinner-border-sm"></span>):
                    (<span>Create</span>)}
                    </Button>
                </section>
            </InputContainer>
            <TasksContainer>
                {tasks.map((task) => (
                    <Card
                        key={task._id}
                        title={task.description}
                        date={task.createdAt}
                        onClick={() => handleCompleted(task._id)}
                    />
                ))}
            </TasksContainer>
        </Container>
    )
}

export default Dashboard;