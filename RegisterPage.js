import React, { useState } from 'react';
import { Container, CssBaseline, AppBar, Toolbar, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterPage.css'; // Импортируем стили для баннера

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                firstName,
                lastName,
                email,
                password
            });
            setMessage(response.data.message);
            if (response.data.message === 'Регистрация успешна') {
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Задержка перед перенаправлением на страницу входа
            }
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <Container>
            <CssBaseline />
            <AppBar position="static" className="banner"> {/* Применяем класс для скругленного баннера */}
                <Toolbar>
                    <Typography variant="h6">Регистрация</Typography>
                </Toolbar>
            </AppBar>
            <Grid container direction="column" alignItems="center" style={{ marginTop: '16px' }}>
                <Paper style={{ padding: '16px', maxWidth: '400px', width: '100%' }}>
                    <Grid item xs={12} style={{ marginBottom: '16px' }}>
                        <TextField
                            fullWidth
                            label="Имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '16px' }}>
                        <TextField
                            fullWidth
                            label="Фамилия"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
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
                            onClick={handleRegister}
                        >
                            Зарегистрироваться
                        </Button>
                    </Grid>
                    {message && (
                        <Typography variant="body1" style={{ marginTop: '16px', color: message === 'Регистрация успешна' ? 'green' : 'red' }}>
                            {message}
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Container>
    );
};

export default RegisterPage;
