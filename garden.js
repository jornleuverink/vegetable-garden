// calculate the yield for plant //
const getYieldForPlant = (input, environmentFactors) => {
    let result = 0;
    if (!environmentFactors) {
        return input.yield;
    } else {
        const percentageFactor = (input.factors.sun[environmentFactors.sun] + 100) / 100;
        result += input.yield * percentageFactor;
        return result;
    };
};

// calculate the yield for crop //
const getYieldForCrop = (input, environmentFactors) => {
    let result = 0;
    if (!environmentFactors) {
        return input.crop.yield * input.numCrops;
    } else {
        const percentageSunFactor = (input.crop.factors.sun[environmentFactors.sun] + 100) / 100;
        const percentageWindFactor = (input.crop.factors.wind[environmentFactors.wind] + 100) / 100;
        const totalPercentage = Math.round(percentageSunFactor * percentageWindFactor * 10) / 10;
        result = input.crop.yield * input.numCrops * totalPercentage;
        return result;
    };
};

// calculate the total yield //
const getTotalYield = (input, environmentFactors) => {
    const crops = input.crops;
    const cropsYield = crops.map((crop) => getYieldForCrop(crop, environmentFactors));
    return cropsYield.reduce((accumulator, currentValue) => accumulator + currentValue);
};

// calculate the cost for a crop //
const getCostsForCrop = (input) => {
    return input.crop.costs * input.crop.yield * input.numCrops;
};

// calculate the revenue for a crop //
const getRevenueForCrop = (input, environmentFactors) => {
    const cropYield = getYieldForCrop(input, environmentFactors);
    const revenueForCrop = cropYield * input.crop.salePrice;
    return revenueForCrop;
};

// calculate the profit for a crop //
const getProfitForCrop = (input, environmentFactors) => {
    const revenuePerCrop = getRevenueForCrop(input, environmentFactors);
    const costPerCrop = input.crop.costs * input.numCrops * input.crop.yield;
    return revenuePerCrop - costPerCrop;
};

// calculate the profit for multiple crops //
const getTotalProfit = (input, enviromentFactors) => {
    const crops = input.crops;
    const profit = crops.map((crop) => getProfitForCrop(crop, enviromentFactors));
    return profit.reduce((accumulator, currentValue) => accumulator + currentValue);
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};