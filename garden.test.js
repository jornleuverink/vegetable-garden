const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./garden");

// test: calculate yield for plant //
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50
            },
        },
    };
    const environmentFactors = {
        sun: "low",
    };

    test("Get yield for plant without environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

});

// test: calculate yield for crop //
describe("getYieldForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50
            },
            wind: {
                low: 0,
                medium: -20,
                high: -60
            },
        },
    };
    const input = {
        crop: corn,
        numCrops: 10
    };

    const environmentFactors = {
        sun: "high",
        wind: "medium",
    };

    test("Get yield for crop without environment factors", () => {
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop with environment factors", () => {
        expect(getYieldForCrop(input, environmentFactors)).toBe(36);
    });

});

// test: calculate the total yield //
describe("getTotalYield", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50
            },
            wind: {
                low: 0,
                medium: -20,
                high: -60
            },
        },
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50
            },
            wind: {
                low: 0,
                medium: -20,
                high: -60
            },
        },
    };

    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];

    const environmentFactors = {
        sun: "high",
        wind: "medium",
    };

    test("Get total yield without environment factors", () => {
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Get total yield with environment factors", () => {
        expect(getTotalYield({ crops }, environmentFactors)).toBe(27.6);
    });

});

// test: calculate the cost for a crop //
describe("getCostsForCrop", () => {
    test("Get costs for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(30);
    });
});

// test: calculate the revenue for a crop //
describe("getRevenueForCrop", () => {
    test("Calculate revenue for corn with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costst: 1,
            salePrice: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -60,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(72);
    });
});

// test: calculate the profit for a crop //
describe("getProfitForCrop", () => {
    test("Calculate profit for corn with enviromentFactors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            salePrice: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -60,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(60);
    });
});

// test: calculate the profit for multiple crops //
describe("getTotalProfit", () => {
    test("Calculate total profit with enviromentFactors multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costs: 1,
            salePrice: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costs: 2,
            salePrice: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: 0,
                    medium: -20,
                    high: -60,
                },
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(43.4);
    });
});