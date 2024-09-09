export const calculatePerformanceScore = (selectedComponents) => {
    let cpuScore = 0;
    let gpuScore = 0;
    let ramScore = 0;
    let ssdScore = 0;

    // Веса для различных характеристик
    const cpuWeights = { cores: 0.3, frequency: 0.3, power: 0.1, cache: 0.3 };
    const gpuWeights = { shaders: 0.4, frequency: 0.4, power: 0.1, memory: 0.1 };
    const ramWeights = { capacity: 0.5, speed: 0.5, type: 0.1 };
    const ssdWeights = { read_speed: 0.4, write_speed: 0.4, type: 0.2 };

    selectedComponents.forEach(component => {
        const count = component.count || 1; // Учитываем количество компонентов
        switch (component.category) {
            case 'CPU':
                cpuScore += (component.cores * cpuWeights.cores) + 
                            (component.frequency * cpuWeights.frequency) + 
                            (component.power * cpuWeights.power) +
                            (component.cache ? component.cache * cpuWeights.cache : 0);
                break;
            case 'GPU':
                gpuScore += (component.shaders * gpuWeights.shaders) + 
                            (component.frequency * gpuWeights.frequency) + 
                            (component.power * gpuWeights.power) +
                            (component.memory ? component.memory * gpuWeights.memory : 0);
                break;
            case 'RAM':
                ramScore += count * ((component.capacity * ramWeights.capacity) + 
                            (component.speed * ramWeights.speed) +
                            (component.type === 'DDR5' ? ramWeights.type : 0));
                break;
            case 'SSD':
                ssdScore += (component.read_speed * ssdWeights.read_speed) + 
                            (component.write_speed * ssdWeights.write_speed) +
                            (component.type === 'NVMe' ? ssdWeights.type : 0);
                break;
            default:
                break;
        }
    });

    // Пример взаимодействия между CPU и GPU
    const interactionBonus = (cpuScore * gpuScore) * 0.1;

    // Итоговая оценка с учетом всех параметров и взаимодействий
    const totalScore = (cpuScore + gpuScore + ramScore + ssdScore) + interactionBonus;

    return totalScore;
};
