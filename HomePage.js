import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Card, CardContent, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import './styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleStartBuild = () => {
        if (user) {
            navigate('/build');
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegister = () => {
        setOpen(false);
        navigate('/register');
    };

    const handleLogin = () => {
        setOpen(false);
        navigate('/login');
    };

    const handlePopularBuilds = () => {
        navigate('/popular-builds');
    };

    const handleBuildByCost = () => {
        navigate('/build-by-cost');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <Container>
            <CssBaseline />
            <AppBar position="static" className="banner">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Конфигуратор ПК</Typography>
                    {user && (
                        <IconButton color="inherit" onClick={handleProfileClick}>
                            <AccountCircle />
                            <Typography variant="body1" style={{ marginLeft: '8px' }}>
                                Добро пожаловать, {user.first_name}
                            </Typography>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <div className="container">
                <Card className="gradient-card gradient1">
                    <CardContent className="card-content">
                        <Typography variant="h5">Начать сборку ПК</Typography>
                        <Typography variant="body1">
                            Начните новую сборку ПК, выбрав компоненты, которые вам нужны.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleStartBuild} className="action-button">
                            ПЕРЕЙТИ
                        </Button>
                    </CardContent>
                </Card>
                <Card className="gradient-card gradient2">
                    <CardContent className="card-content">
                        <Typography variant="h5">Популярные сборки ПК</Typography>
                        <Typography variant="body1">
                            Просмотрите популярные сборки ПК, чтобы получить идеи для своей сборки.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handlePopularBuilds} className="action-button">
                            ПЕРЕЙТИ
                        </Button>
                    </CardContent>
                </Card>
                <Card className="gradient-card gradient3">
                    <CardContent className="card-content">
                        <Typography variant="h5">Собрать сборку по стоимости</Typography>
                        <Typography variant="body1">
                            Создайте сборку ПК в рамках вашего бюджета, выбрав компоненты по стоимости.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleBuildByCost} className="action-button">
                            ПЕРЕЙТИ
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Требуется регистрация"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Чтобы продолжить, пожалуйста, зарегистрируйтесь или войдите в свой аккаунт.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegister} color="primary">
                        Регистрация
                    </Button>
                    <Button onClick={handleLogin} color="primary">
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default HomePage;
