import React, { useState } from 'react';
import { Container, CssBaseline, AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css'; // Импортируем стили для баннера

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });
            setMessage(response.data.message);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Сохранение данных пользователя
            navigate('/profile'); // Перенаправление на страницу профиля
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <Container>
            <CssBaseline />
            <AppBar position="static" className="banner"> {/* Применяем класс для скругленного баннера */}
                <Toolbar>
                    <Typography variant="h6">Вход</Typography>
                </Toolbar>
            </AppBar>
            <Grid container direction="column" alignItems="center" style={{ marginTop: '16px' }}>
                <Paper style={{ padding: '16px', maxWidth: '400px', width: '100%' }}>
                    <Grid item xs={12} style={{ marginBottom: '16px' }}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '16px' }}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            Войти
                        </Button>
                    </Grid>
                    {message && (
                        <Typography variant="body1" style={{ marginTop: '16px', color: 'red' }}>
                            {message}
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Container>
    );
};

export default LoginPage;
