function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

/////////////////////////////////////////////////////////
let DATA = {
    type: 'bar',
    data:
    {
        labels: [], //name of processes
        datasets:
            [{
                label: 'Process Timings',
                data: []
            }],
    },
    options:
    {
        indexAxis: 'y',
        scales:
        {
            y:
            {
                beginAtZero: false
            }
        }
    }
}

function objectReady(out) 
{
    DATA.data.labels = out.map(a => a.name)
    DATA.data.datasets[0].data = transpose([
        out.map(a => a.start),
        out.map(a => a.end)
    ])

    //DATA.data.datasets.data = DATA.data.datasets[0].data[0].map((col, i) => DATA.data.datasets[0].data.map(row => row[i]))

/*     console.log(DATA.data.labels)
    console.log(DATA.data.datasets.data) */

    console.log(transpose([
        out.map(a => a.start),
        out.map(a => a.end)
    ]))
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quit-button').addEventListener('click', () => {
        console.log("APP QUIT")
        window.api.send('quit_app')
    })
    document.getElementById('minimize-button').addEventListener('click', () => {
        window.api.minimize()
    })

    document.getElementById('add-data').addEventListener('click',() => {
        console.log(document.getElementById('at').value)
        fill_inputArray(
            parseInt(document.getElementById('at').value),
            parseInt(document.getElementById('bt').value),
            parseInt(document.getElementById('pr').value)
        )
        add_data_to_table()
    })

    document.getElementById('schedule-button').addEventListener('click', () => {
        let resultant
        if (fcfs_flag) {
            resultant = FCFS(inputArray)
            objectReady(resultant)
        } else if (sjf_flag) {
            resultant = non_preemptive_sjf(inputArray)
            objectReady(resultant)
        } else if (pr_flag) {
            resultant = priority_queue(inputArray)
            objectReady(resultant)
        } else if (rr_flag) {
            resultant = round_robin(3,inputArray)
            objectReady(resultant)
        } else {
            let txt = document.getElementById('algo-display')
            txt.innerHTML = "ALGORITHM NOT SELECTED!! Select an algorithm."
        }

        
        console.log(DATA.data.datasets[0].data)
        //objectReady(resultant)
        /* const ctx = document.getElementById('gantt-chart');
        new Chart(ctx, DATA); */
        //Chart.chartCreate(document.getElementById('gantt-chart'), DATA)
        

        fcfs_flag = false
        sjf_flag = false
        pr_flag = false
        rr_flag = false
        
    })

    document.getElementById('clear-data').addEventListener('click', () => {
        inputArray = []
        var ta = document.getElementById('data-table');
        for (let i = 0; i < ta.rows.length; i++)
            ta.deleteRow(i)
    })
})



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

function add_data_to_table() {
    var ta = document.getElementById('data-table');
    var row = ta.insertRow(document.getElementById('data-table').rows.length)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    cell1.innerHTML = inputArray[inputArray.length - 1].name
    cell2.innerHTML = inputArray[inputArray.length - 1].arrival_time
    cell3.innerHTML = inputArray[inputArray.length - 1].burst_time
    cell4.innerHTML = inputArray[inputArray.length - 1].priority
}

let fcfs_flag = false, sjf_flag = false, pr_flag = false, rr_flag = false
function select_algorithm(navbar_id) {
    let txt = document.getElementById('algo-display')
    if (navbar_id === 'fcfs-sel') {
        fcfs_flag = true
        sjf_flag = false
        pr_flag = false
        rr_flag = false
        txt.innerHTML = "FCFS SELECTED"
    } else if (navbar_id === 'np-sjf-sel') {
        fcfs_flag = false
        sjf_flag = true
        pr_flag = false
        rr_flag = false
        txt.innerHTML = "SJF SELECTED"
    } else if (navbar_id === 'pr-sel') {
        fcfs_flag = false
        sjf_flag = false
        pr_flag = true
        rr_flag = false
        txt.innerHTML = "PRIORITY SELECTED"
    } else if (navbar_id === 'rr-sel') {
        fcfs_flag = false
        sjf_flag = false
        pr_flag = false
        rr_flag = true
        txt.innerHTML = "ROUND ROBIN SELECTED"
    }
}
