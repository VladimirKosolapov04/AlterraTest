import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    getCPUs, getGPUs, getRAMs, getMotherboards, getSSDs, getPowerSupplies, getCases, getCoolers, getMonitors, getKeyboards, checkCompatibility
} from './api';
import { CssBaseline, AppBar, Toolbar, Container, Typography, Button, Grid, Paper, IconButton, TextField } from '@mui/material';
import { ArrowBack, ExpandMore, ExpandLess, AccountCircle, Info } from '@mui/icons-material';
import SelectedComponents from './SelectedComponents';
import ComponentInfoDialog from './ComponentInfoDialog';
import CompatibilityDialog from './CompatibilityDialog';
import CostDialog from './CostDialog';
import PerformanceDialog from './PerformanceDialog';
import './styles/ComponentSelector.css'; // Импортируем стили

const ComponentSelector = () => {
    const navigate = useNavigate();
    const [components, setComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [isCompatible, setIsCompatible] = useState(null);
    const [issues, setIssues] = useState([]);
    const [visibleCategories, setVisibleCategories] = useState({});
    const [buildName, setBuildName] = useState('');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [compatibilityOpen, setCompatibilityOpen] = useState(false);
    const [costDialogOpen, setCostDialogOpen] = useState(false);
    const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const [
                    cpus, gpus, rams, motherboards, ssds, powerSupplies, cases, coolers, monitors, keyboards
                ] = await Promise.all([
                    getCPUs(), getGPUs(), getRAMs(), getMotherboards(), getSSDs(), getPowerSupplies(), getCases(), getCoolers(), getMonitors(), getKeyboards()
                ]);

                const allComponents = [
                    ...cpus.map(component => ({ ...component, category: 'CPU' })),
                    ...gpus.map(component => ({ ...component, category: 'GPU' })),
                    ...rams.map(component => ({ ...component, category: 'RAM' })),
                    ...motherboards.map(component => ({ ...component, category: 'Motherboard' })),
                    ...ssds.map(component => ({ ...component, category: 'SSD' })),
                    ...powerSupplies.map(component => ({ ...component, category: 'Power Supply' })),
                    ...cases.map(component => ({ ...component, category: 'Case' })),
                    ...coolers.map(component => ({ ...component, category: 'Cooler' })),
                    ...monitors.map(component => ({ ...component, category: 'Monitor' })),
                    ...keyboards.map(component => ({ ...component, category: 'Keyboard' }))
                ];

                setComponents(allComponents);

                const categories = [
                    'CPU', 'GPU', 'RAM', 'Motherboard', 'SSD', 'Power Supply', 'Case', 'Cooler', 'Monitor', 'Keyboard'
                ];

                const initialVisibility = categories.reduce((acc, category) => {
                    acc[category] = false;
                    return acc;
                }, {});

                setVisibleCategories(initialVisibility);
            } catch (error) {
                console.error('Error fetching components:', error);
            }
        };

        fetchComponents();
    }, []);

    const handleAddComponent = (component) => {
    if (component.category === 'RAM') {
        const existingRamIndex = selectedComponents.findIndex(c => c.category === 'RAM' && c.name === component.name);
        if (existingRamIndex > -1) {
            const updatedComponents = [...selectedComponents];
            updatedComponents[existingRamIndex].count += 1;
            setSelectedComponents(updatedComponents);
        } else {
            component.count = 1;
            setSelectedComponents([...selectedComponents, component]);
        }
    } else {
        setSelectedComponents([...selectedComponents, component]);
    }
};

const handleRemoveComponent = (componentToRemove) => {
    if (componentToRemove.category === 'RAM') {
        const ramIndex = selectedComponents.findIndex(c => c.category === 'RAM' && c.name === componentToRemove.name);
        if (ramIndex > -1) {
            const updatedComponents = [...selectedComponents];
            if (updatedComponents[ramIndex].count > 1) {
                updatedComponents[ramIndex].count -= 1;
            } else {
                updatedComponents.splice(ramIndex, 1);
            }
            setSelectedComponents(updatedComponents);
        }
    } else {
        const componentIndex = selectedComponents.findIndex(component => component.id === componentToRemove.id && component.category === componentToRemove.category);
        if (componentIndex > -1) {
            const newSelectedComponents = [...selectedComponents];
            newSelectedComponents.splice(componentIndex, 1);
            setSelectedComponents(newSelectedComponents);
        }
    }
};

    const handleCheckCompatibility = async () => {
        const compatibilityResponse = await checkCompatibility(selectedComponents);
        setIsCompatible(compatibilityResponse.isCompatible);
        setIssues(compatibilityResponse.issues || []);
        setCompatibilityOpen(true);
    };

    const toggleCategoryVisibility = (category) => {
        setVisibleCategories({
            ...visibleCategories,
            [category]: !visibleCategories[category]
        });
    };

    const handleSaveBuild = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            try {
                const componentNames = selectedComponents.map(component => component.name);
                await axios.post(`http://localhost:5000/api/users/${user.id}/pcbuilds`, {
                    name: buildName,
                    components: JSON.stringify(componentNames)
                });
                navigate('/profile');
            } catch (error) {
                console.error('Ошибка при сохранении сборки:', error);
            }
        } else {
            navigate('/login');
        }
    };

    const handleOpenInfo = (component) => {
        setSelectedComponent(component);
        setInfoOpen(true);
    };

    const handleCloseInfo = () => {
        setInfoOpen(false);
        setSelectedComponent(null);
    };

    const handleCloseCompatibility = () => {
        setCompatibilityOpen(false);
    };

    const handleOpenCostDialog = () => {
        setCostDialogOpen(true);
    };

    const handleCloseCostDialog = () => {
        setCostDialogOpen(false);
    };

    const handleOpenPerformanceDialog = () => {
        setPerformanceDialogOpen(true);
    };

    const handleClosePerformanceDialog = () => {
        setPerformanceDialogOpen(false);
    };

    const categories = ['CPU', 'GPU', 'RAM', 'Motherboard', 'SSD', 'Power Supply', 'Case', 'Cooler', 'Monitor', 'Keyboard'];

    return (
        <Container>
            <CssBaseline />
            <AppBar position="static" className="banner"> {/* Применяем класс для скругленного баннера */}
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Выберите комплектующие</Typography>
                    <IconButton color="inherit" onClick={() => navigate('/profile')}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TextField
                fullWidth
                label="Название сборки"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                style={{ margin: '16px 0' }}
            />
            {categories.map(category => (
                <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }} key={category}>
                    <Typography variant="h6" onClick={() => toggleCategoryVisibility(category)}>
                        Доступные {category}s
                        <IconButton>
                            {visibleCategories[category] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Typography>
                    {visibleCategories[category] && (
                        <Grid container spacing={2}>
                            {components.filter(component => component.category === category).map(component => (
                                <Grid item key={`${category}-${component.id}`} xs={12} sm={6} md={4}>
                                    <Paper style={{ padding: '16px', textAlign: 'center', position: 'relative' }}>
                                        <IconButton 
                                            onClick={() => handleOpenInfo(component)} 
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                        >
                                            <Info />
                                        </IconButton>
                                        <Typography variant="subtitle1">{component.name}</Typography>
                                        <Typography variant="subtitle2">${component.price}</Typography>
                                        <Button variant="contained" color="primary" onClick={() => handleAddComponent(component)}>
                                            Добавить
                                        </Button>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Paper>
            ))}
            <SelectedComponents 
                selectedComponents={selectedComponents} 
                handleRemoveComponent={handleRemoveComponent} 
                handleAddComponent={handleAddComponent} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <Button variant="contained" color="secondary" onClick={handleCheckCompatibility}>
                    Проверить совместимость
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveBuild}>
                    Сохранить сборку
                </Button>
                <Button variant="contained" onClick={handleOpenCostDialog}>
                    Общая стоимость
                </Button>
                <Button variant="contained" onClick={handleOpenPerformanceDialog}>
                    Оценка производительности
                </Button>
            </div>
            <ComponentInfoDialog open={infoOpen} onClose={handleCloseInfo} component={selectedComponent} />
            <CompatibilityDialog 
                open={compatibilityOpen} 
                onClose={handleCloseCompatibility} 
                isCompatible={isCompatible} 
                issues={issues} 
            />
            <CostDialog open={costDialogOpen} onClose={handleCloseCostDialog} selectedComponents={selectedComponents} />
            <PerformanceDialog open={performanceDialogOpen} onClose={handleClosePerformanceDialog} selectedComponents={selectedComponents} />
        </Container>
    );
};

export default ComponentSelector;
