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
            [/* {
                label: 'Process Timings',
                data: []
            } */],
    },
    options:
    {
        indexAxis: 'y',
        scales:
        {
            y:
            {
                beginAtZero: false,
                stacked: true
            }
        },
        plugins:
        {
            legend: 
            {
                display: false
            }
        }
    }
}

function objectReady(out) // for fcfs, sjf and priority
{
    DATA.data.datasets = []
    DATA.data.datasets.push({
        label: 'Process Timings',
        data: []
    })
    DATA.data.labels = out.map(a => a.name)
    DATA.data.datasets[0].data = transpose([
        out.map(a => a.start),
        out.map(a => a.end)
    ])
    console.log(transpose([
        out.map(a => a.start),
        out.map(a => a.end)
    ]))
}

function rrGraphData(out) {
    DATA.data.labels = [... new Set(out.map(a => a.name))] // names of processes in order of name
    console.log(DATA.data.labels)
    DATA.data.datasets = []
    for (let i = 0; i < DATA.data.labels.length; i++) { // i -> no of processes
        let graphcoords = []
        DATA.data.labels.forEach(element => { // process by process (preempted)
            const proc = out.find((o) => { // proc (first process with name element)
                return o.name === element
            })
            if (typeof proc === 'undefined') graphcoords.push([0, 0])
            else {
                graphcoords.push([proc.start, proc.end])
                //out.shift()
                out.splice(out.indexOf(proc), 1); // removes pushed process
            }
        })

        console.log(graphcoords)
        DATA.data.datasets.push({
            label: 'set' + (i + 1),
            data: graphcoords,
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5'
        })
    }
}

let smallest_at

/////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        smallest_at = Math.min(...arrivalColumn)
        console.log("Smallest at = " + smallest_at)
        if (smallest_at > 0) {
            inputArray.forEach((t) => {
                t.arrival_time -= smallest_at
            })
            let txt = document.getElementById('algo-display')
            txt.innerHTML = "**ADJUSTED ARRIVAL TIME SO THE SCHEDULING STARTS AT TIME 0**"
        }
        let resultant
        if (fcfs_flag) {
            resultant = FCFS(inputArray)
            resultant.sort((a, b) => {
                return parseInt(a.name.substring(1)) - parseInt(b.name.substring(1))
            })
            add_result_time(resultant)
            objectReady(resultant)
        } else if (sjf_flag) {
            resultant = non_preemptive_sjf(inputArray)
            resultant.sort((a, b) => {
                return parseInt(a.name.substring(1)) - parseInt(b.name.substring(1))
            })
            add_result_time(resultant)
            objectReady(resultant)
        } else if (pr_flag) {
            resultant = priority_queue(inputArray)
            resultant.sort((a, b) => {
                console.log('a = ' + a.name.substring(1)) + ' b = ' + parseInt(b.name.substring(1))
                return parseInt(a.name.substring(1)) - parseInt(b.name.substring(1))
            })
            add_result_time(resultant)
            objectReady(resultant)
        } else if (rr_flag) {
            var quanta_number = parseInt(document.getElementById("quan").value)
            resultant = round_robin(quanta_number, inputArray)
           /*  resultant.sort((a, b) => {
                console.log('a = ' + a.name.substring(1)) + ' b = ' + parseInt(b.name.substring(1))
                return parseInt(a.name.substring(1)) - parseInt(b.name.substring(1))
            }) */
            add_rr_time(resultant)
            rrGraphData(resultant)
        } else {
            let txt = document.getElementById('algo-display')
            txt.innerHTML = "ALGORITHM NOT SELECTED!! Select an algorithm."
        }
        console.log(resultant)
        fcfs_flag = false
        sjf_flag = false
        pr_flag = false
        rr_flag = false
    })

    document.getElementById('clear-data').addEventListener('click', () => {
        inputArray.splice(0,inputArray.length)
        arrivalColumn.splice(0, arrivalColumn.length)
        var ta = document.getElementById('data-table')
        let s = ta.rows.length
        for (let i = 1; i < s; i++)
            ta.deleteRow(1)
        process_no = 1
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

const arrivalColumn = [], burstColumn = []
function add_data_to_table() {
    let ta = document.getElementById('data-table');
    let row = ta.insertRow(document.getElementById('data-table').rows.length)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)
    let cell4 = row.insertCell(3)
    cell1.innerHTML = inputArray[inputArray.length - 1].name
    cell2.innerHTML = inputArray[inputArray.length - 1].arrival_time
    arrivalColumn.push(inputArray[inputArray.length - 1].arrival_time)
    cell3.innerHTML = inputArray[inputArray.length - 1].burst_time
    burstColumn.push(inputArray[inputArray.length - 1].burst_time)
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
        document.getElementById('quanta-field').innerHTML = ''
    } else if (navbar_id === 'np-sjf-sel') {
        fcfs_flag = false
        sjf_flag = true
        pr_flag = false
        rr_flag = false
        txt.innerHTML = "SJF SELECTED"
        document.getElementById('quanta-field').innerHTML = ''
    } else if (navbar_id === 'pr-sel') {
        fcfs_flag = false
        sjf_flag = false
        pr_flag = true
        rr_flag = false
        txt.innerHTML = "PRIORITY SELECTED"
        document.getElementById('quanta-field').innerHTML = ''
    } else if (navbar_id === 'rr-sel') {
        fcfs_flag = false
        sjf_flag = false
        pr_flag = false
        rr_flag = true
        txt.innerHTML = "ROUND ROBIN SELECTED"
        document.getElementById('quanta-field').innerHTML = 
        '<input class="form-control" onfocus="this.value="" type="number" id="quan" name="Quan" class="times" placeholder="Quanta">'
    }
}

function add_result_time(arr) {
    let ta = document.getElementById('data-table')
    //let head = document.getElementById('header-row')
    //let new_col = document.createElement('th')
    //head.innerHTML = head.innerHTML + '<th>Waiting Time</th>'
    const completion_time = [], turnaround = [], waitingtime = []
    for (let i = 0; i < ta.rows.length - 1; i++) { // completion time
        let cell = ta.rows[i + 1].insertCell(4)
        cell.innerHTML = arr[i].end + smallest_at
        completion_time.push(arr[i].end + smallest_at)
    }

    for (let i = 0; i < ta.rows.length - 1; i++) { //turnaround
        let cell = ta.rows[i + 1].insertCell(5)
        cell.innerHTML = completion_time[i] - arrivalColumn[i]
        turnaround.push(completion_time[i] - arrivalColumn[i])
    }

    for (let i = 0; i < ta.rows.length - 1; i++) { //waiting time
        let cell = ta.rows[i + 1].insertCell(6)
        cell.innerHTML = turnaround[i] - burstColumn[i]
        waitingtime.push(turnaround[i] - burstColumn[i])
    }
    
}

function add_rr_time(arr) {
    let ta = document.getElementById('data-table')
    const completion_time = [], turnaround = [], waitingtime = []
    
    //for getting completion time
    //var things = _.uniq(data, function(d){ return d.ID });
    const last_quantas = [... new Set(arr.reverse())]
    
    for (let i = 0; i < ta.rows.length - 1; i++) { // completion time
        let cell = ta.rows[i + 1].insertCell(4)
        cell.innerHTML = last_quantas[i].end + smallest_at
        completion_time.push(arr[i].end + smallest_at)
    }

    for (let i = 0; i < ta.rows.length - 1; i++) { //turnaround
        let cell = ta.rows[i + 1].insertCell(5)
        cell.innerHTML = completion_time[i] - arrivalColumn[i]
        turnaround.push(completion_time[i] - arrivalColumn[i])
    }

    for (let i = 0; i < ta.rows.length - 1; i++) { //waiting time
        let cell = ta.rows[i + 1].insertCell(6)
        cell.innerHTML = turnaround[i] - burstColumn[i]
        waitingtime.push(turnaround[i] - burstColumn[i])
    }
}