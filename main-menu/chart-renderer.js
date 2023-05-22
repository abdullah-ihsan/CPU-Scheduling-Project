let DATA = {
    type: 'bar',
    data:
    {
        labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
        datasets:
            [{
                label: '# of Votes',
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

