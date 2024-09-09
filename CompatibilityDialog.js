import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const CompatibilityDialog = ({ open, onClose, isCompatible, issues }) => {
    const [helpOpen, setHelpOpen] = useState(false);

    const handleHelpOpen = () => {
        setHelpOpen(true);
    };

    const handleHelpClose = () => {
        setHelpOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Проверка совместимости</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        {isCompatible ? "Все компоненты совместимы." : "Есть проблемы с совместимостью."}
                    </Typography>
                    {!isCompatible && (
                        <ul>
                            {issues.map((issue, index) => (
                                <li key={index}>
                                    <Typography variant="body1">{issue}</Typography>
                                </li>
                            ))}
                        </ul>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHelpOpen} color="secondary">
                        Как это работает?
                    </Button>
                    <Button onClick={onClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={helpOpen} onClose={handleHelpClose}>
                <DialogTitle>Как работает проверка совместимости?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Проверка совместимости компонентов включает в себя следующие факторы:
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body2">
                                <strong>Сокет процессора (CPU) и материнской платы:</strong> Процессор должен быть совместим с сокетом материнской платы.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                <strong>Оперативная память (RAM):</strong> Тип, скорость и количество оперативной памяти должны поддерживаться материнской платой.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                <strong>Видеокарта (GPU):</strong> Длина видеокарты должна соответствовать корпусу, а мощность блока питания должна быть достаточной для питания видеокарты.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                <strong>Блок питания (PSU):</strong> Блок питания должен иметь достаточную мощность для всех компонентов сборки.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                <strong>Накопители (SSD/HDD):</strong> Интерфейс накопителей должен поддерживаться материнской платой (например, SATA или NVMe).
                            </Typography>
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHelpClose} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CompatibilityDialog;
