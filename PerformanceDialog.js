import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';
import { calculatePerformanceScore } from './performance';

const getPerformanceExplanation = (score) => {
    if (score >= 400000) {
        return "Этот компьютер отлично подходит для высокопроизводительных задач, таких как профессиональное редактирование видео, 3D-моделирование и высококачественные игры.";
    } else if (score >= 300000) {
        return "Этот компьютер хорошо справляется с большинством задач, включая современные игры и многозадачность.";
    } else if (score >= 200000) {
        return "Этот компьютер подходит для выполнения повседневных задач, таких как работа с документами, просмотр веб-страниц и базовые игры.";
    } else {
        return "Этот компьютер может испытывать трудности с выполнением современных задач и игр. Рекомендуется обновление компонентов.";
    }
};

const PerformanceDialog = ({ open, onClose, selectedComponents }) => {
    const [performanceScore, setPerformanceScore] = React.useState(0);

    useEffect(() => {
        setPerformanceScore(calculatePerformanceScore(selectedComponents));
    }, [selectedComponents]);

    const performanceExplanation = getPerformanceExplanation(performanceScore);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Оценка производительности</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Оценка производительности сборки: {performanceScore.toFixed(2)}</Typography>
                <Box style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        {performanceExplanation}
                    </Typography>
                </Box>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Оценка производительности основана на различных характеристиках выбранных компонентов, таких как количество ядер, частота, мощность и другие параметры для процессоров (CPU), видеокарт (GPU), оперативной памяти (RAM) и твердотельных накопителей (SSD).
                </Typography>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Чем выше оценка, тем более мощная и производительная система. Эта оценка позволяет сравнивать различные сборки по их общей производительности.
                </Typography>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Оценка также учитывает взаимодействие между компонентами, например, производительность CPU и GPU, чтобы дать более точную оценку общей производительности сборки.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PerformanceDialog;
