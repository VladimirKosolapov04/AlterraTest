import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const ComponentInfoDialog = ({ open, onClose, component }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Сведения о компоненте</DialogTitle>
            <DialogContent>
                {component && (
                    <div>
                        <Typography variant="subtitle1">Название: {component.name}</Typography>
                        <Typography variant="subtitle2">Цена: ${component.price}</Typography>
                        
                        {/* Параметры для CPU */}
                        {component.category === 'CPU' && component.socket && <Typography>Сокет: {component.socket}</Typography>}
                        {component.category === 'CPU' && component.power && <Typography>Мощность: {component.power}W</Typography>}
                        {component.category === 'CPU' && component.cores && <Typography>Количество ядер: {component.cores}</Typography>}
                        {component.category === 'CPU' && component.frequency && <Typography>Тактовая частота: {component.frequency}MHz</Typography>}
                        {component.category === 'CPU' && component.cache && <Typography>Размер кэша: {component.cache}MB</Typography>}
                        
                        {/* Параметры для GPU */}
                        {component.category === 'GPU' && component.length && <Typography>Длина: {component.length}mm</Typography>}
                        {component.category === 'GPU' && component.power && <Typography>Мощность: {component.power}W</Typography>}
                        {component.category === 'GPU' && component.shaders && <Typography>Количество шейдерных процессоров: {component.shaders}</Typography>}
                        {component.category === 'GPU' && component.frequency && <Typography>Частота GPU: {component.frequency}MHz</Typography>}
                        {component.category === 'GPU' && component.memory && <Typography>Размер VRAM: {component.memory}GB</Typography>}
                        
                        {/* Параметры для RAM */}
                        {component.category === 'RAM' && component.ram_type && <Typography>Тип ОЗУ: {component.ram_type}</Typography>}
                        {component.category === 'RAM' && component.capacity && <Typography>Объем: {component.capacity}GB</Typography>}
                        {component.category === 'RAM' && component.speed && <Typography>Частота: {component.speed}MHz</Typography>}
                        
                        {/* Параметры для Motherboard */}
                        {component.category === 'Motherboard' && component.socket && <Typography>Сокет: {component.socket}</Typography>}
                        {component.category === 'Motherboard' && component.form_factor && <Typography>Форм-фактор: {component.form_factor}</Typography>}
                        {component.category === 'Motherboard' && component.max_ram && <Typography>Максимальный объем ОЗУ: {component.max_ram}GB</Typography>}
                        {component.category === 'Motherboard' && component.max_ram_slots && <Typography>Количество слотов ОЗУ: {component.max_ram_slots}</Typography>}
                        {component.category === 'Motherboard' && component.ram_type && <Typography>Тип ОЗУ: {component.ram_type}</Typography>}
                        
                        {/* Параметры для SSD */}
                        {component.category === 'SSD' && component.capacity && <Typography>Емкость: {component.capacity}GB</Typography>}
                        {component.category === 'SSD' && component.type && <Typography>Тип: {component.type}</Typography>}
                        {component.category === 'SSD' && component.interface && <Typography>Интерфейс: {component.interface}</Typography>}
                        {component.category === 'SSD' && component.read_speed && <Typography>Скорость чтения: {component.read_speed}MB/s</Typography>}
                        {component.category === 'SSD' && component.write_speed && <Typography>Скорость записи: {component.write_speed}MB/s</Typography>}
                        
                        {/* Параметры для Power Supply */}
                        {component.category === 'Power Supply' && component.wattage && <Typography>Мощность: {component.wattage}W</Typography>}
                        
                        {/* Параметры для Case */}
                        {component.category === 'Case' && component.form_factor && <Typography>Форм-фактор: {component.form_factor}</Typography>}
                        {component.category === 'Case' && component.max_gpu_length && <Typography>Максимальная длина GPU: {component.max_gpu_length}mm</Typography>}
                        
                        {/* Параметры для Cooler */}
                        {component.category === 'Cooler' && component.type && <Typography>Тип: {component.type}</Typography>}
                        
                        {/* Параметры для Monitor */}
                        {component.category === 'Monitor' && component.size && <Typography>Размер: {component.size}"</Typography>}
                        {component.category === 'Monitor' && component.resolution && <Typography>Разрешение: {component.resolution}</Typography>}
                        
                        {/* Параметры для Keyboard */}
                        {component.category === 'Keyboard' && component.type && <Typography>Тип: {component.type}</Typography>}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ComponentInfoDialog;
