import React from 'react';
import { Grid, Paper, Typography, Button, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const SelectedComponents = ({ selectedComponents, handleRemoveComponent, handleAddComponent }) => {
    const categories = ['CPU', 'GPU', 'RAM', 'Motherboard', 'SSD', 'Power Supply', 'Case', 'Cooler', 'Monitor', 'Keyboard'];

    // Создаем объект для хранения компонентов по категориям
    const componentsByCategory = categories.reduce((acc, category) => {
        if (category === 'RAM') {
            const ramModules = selectedComponents.filter(component => component.category === category);
            const ramGrouped = ramModules.reduce((group, ram) => {
                const key = `${ram.name}-${ram.price}`;
                if (!group[key]) {
                    group[key] = { ...ram, count: 0 };
                }
                group[key].count += ram.count;
                return group;
            }, {});
            acc[category] = Object.values(ramGrouped);
        } else {
            acc[category] = selectedComponents.find(component => component.category === category);
        }
        return acc;
    }, {});

    return (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h6">Выбранные компоненты</Typography>
            <Grid container spacing={2}>
                {categories.map(category => (
                    <Grid item xs={12} sm={6} md={4} key={category}>
                        <Paper style={{ padding: '16px', textAlign: 'center', position: 'relative' }}>
                            <Typography variant="subtitle1">{category}</Typography>
                            {componentsByCategory[category] ? (
                                Array.isArray(componentsByCategory[category]) ? (
                                    componentsByCategory[category].map((component, index) => (
                                        <div key={index}>
                                            <Typography variant="subtitle2">{component.name}</Typography>
                                            <Typography variant="subtitle2">${component.price}</Typography>
                                            <Typography variant="subtitle2">Количество: {component.count}</Typography>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <IconButton color="primary" onClick={() => handleAddComponent(component)}>
                                                    <Add />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleRemoveComponent(component)}>
                                                    <Remove />
                                                </IconButton>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <Typography variant="subtitle2">{componentsByCategory[category].name}</Typography>
                                        <Typography variant="subtitle2">${componentsByCategory[category].price}</Typography>
                                        <Button variant="contained" color="secondary" onClick={() => handleRemoveComponent(componentsByCategory[category])}>
                                            Удалить
                                        </Button>
                                    </>
                                )
                            ) : (
                                <Typography variant="body2">Нет выбранных компонентов</Typography>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default SelectedComponents;
