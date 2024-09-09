import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CssBaseline, AppBar, Toolbar, Container, Typography, Grid, Button, TextField, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { ArrowBack, Delete, AccountCircle } from '@mui/icons-material';
import './styles/UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pcBuilds, setPcBuilds] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
                setFirstName(storedUser.first_name);
                setLastName(storedUser.last_name);
                setEmail(storedUser.email);

                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${storedUser.id}/pcbuilds`);
                    const builds = response.data.map(build => ({
                        ...build,
                        components: JSON.parse(build.components) // Парсим строку JSON в объект
                    }));
                    setPcBuilds(builds);
                } catch (error) {
                    console.error('Ошибка при получении сборок ПК', error);
                }
            } else {
                navigate('/login');
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleUpdateUser = async () => {
        if (user) {
            try {
                const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, {
                    firstName,
                    lastName,
                    email,
                    password
                });
                localStorage.setItem('user', JSON.stringify(response.data.user));
                alert('Данные успешно обновлены');
            } catch (error) {
                console.error('Ошибка при обновлении данных пользователя', error);
            }
        }
    };

    const handleDeleteClick = (build) => {
        setSelectedBuild(build);
        setOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${user.id}/pcbuilds/${selectedBuild.id}`);
            setPcBuilds(pcBuilds.filter(build => build.id !== selectedBuild.id));
            setOpen(false);
        } catch (error) {
            console.error('Ошибка при удалении сборки ПК', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <Container>
            <CssBaseline />
            <AppBar position="static" className="banner">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Личный кабинет</Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <Typography variant="body2" style={{ marginRight: '10px' }}>Выйти</Typography>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} style={{ marginTop: '16px' }}>
                <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '16px' }}>
                        <Typography variant="h6">Данные пользователя</Typography>
                        <TextField
                            fullWidth
                            label="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{ margin: '8px 0' }}
                        />
                        <TextField
                            fullWidth
                            label="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ margin: '8px 0' }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ margin: '8px 0' }}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ margin: '8px 0' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                            Обновить данные
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper style={{ padding: '16px' }}>
                        <Typography variant="h6">Мои сборки ПК</Typography>
                        {pcBuilds.length === 0 ? (
                            <Typography>У вас нет сборок.</Typography>
                        ) : (
                            pcBuilds.map((build) => (
                                <Paper key={build.id} style={{ padding: '16px', margin: '8px 0', position: 'relative' }}>
                                    <Typography variant="subtitle1">{build.build_name}</Typography>
                                    <Typography variant="body2">
                                        Компоненты: {build.components.map((component, index) => (
                                            <span key={index}>
                                                {component}{index < build.components.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </Typography>
                                    <IconButton
                                        style={{ position: 'absolute', top: '8px', right: '8px' }}
                                        onClick={() => handleDeleteClick(build)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Paper>
                            ))
                        )}
                        <Button variant="contained" color="primary" onClick={() => navigate('/build')}>
                            Создать сборку ПК
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Подтверждение удаления"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Действительно ли вы хотите удалить вашу сборку ПК "{selectedBuild?.build_name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Нет
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserProfile;
