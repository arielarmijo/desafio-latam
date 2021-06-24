export const chart = (() => {

    const barChart = (chartId, data, options) => {
        const ctx = document.getElementById(chartId).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }; 

    return {
        barChart
    };

})();