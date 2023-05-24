let DATA = {
    type: 'bar',
    data:
    {
        labels: [], //name of processes
        datasets:
            [{
                label: 'Process Timings',
                data: [
                    ['0', '3'],
                    ['3', '6'],
                    ['6', '8'],
                    ['8', '13'],
                    ['13', '15'],
                    ['15', '16']

                ],
                borderWidth: 1,
                barPercentage: 0.75
            }],
    },
    options:
    {
        indexAxis: 'y',
        scales:
        {
            y:
            {
                beginAtZero: true
            }
        }
    }
}

function jsonReady(out) 
{
    DATA.data.labels = out.map(a => a.names)
    DATA.data.datasets.data = [
        out.map(a => a.start),
        out.map(a => a.end)
    ]
    DATA.data.datasets.data = DATA.data.datasets.data[0].map((col, i) => DATA.data.datasets.data.map(row => row[i]));
}