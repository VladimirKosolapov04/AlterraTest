import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const CostDialog = ({ open, onClose, selectedComponents }) => {
    const [totalPrice, setTotalPrice] = React.useState(0);

    useEffect(() => {
        const price = selectedComponents.reduce((acc, component) => {
            return acc + (component.price * (component.count || 1));
        }, 0);
        setTotalPrice(price);
    }, [selectedComponents]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Общая стоимость</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Общая стоимость сборки: ${totalPrice}</Typography>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Общая стоимость сборки включает в себя стоимость всех выбранных компонентов, таких как процессоры (CPU), видеокарты (GPU), оперативная память (RAM), твердотельные накопители (SSD) и другие.
                </Typography>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Эта оценка помогает вам понимать, сколько будет стоить сборка вашего компьютера, и позволяет сравнивать различные конфигурации по их стоимости.
                </Typography>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    Вы можете использовать эту информацию для планирования бюджета и выбора компонентов, которые соответствуют вашим финансовым возможностям.
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

export default CostDialog;
