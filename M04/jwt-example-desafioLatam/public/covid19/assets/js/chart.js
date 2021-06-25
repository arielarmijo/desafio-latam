export const chart = (() => {

    const makeBarChart = (chartId, data, options) => {
        const ctx = document.getElementById(chartId).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
        return chart;
    };

    const makeLineChart = (chartId, data, options) => {
        const ctx = document.getElementById(chartId).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
        return chart;
    };

    const updateChart = (chart, data) => {
        chart.data = data;
        chart.update();
    };

    return {
        makeBarChart,
        makeLineChart,
        updateChart
    };

})();