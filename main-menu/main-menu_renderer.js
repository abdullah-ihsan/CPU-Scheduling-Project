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

    document.getElementById('print-process').addEventListener('click', () => {
        console_process()
    })

    document.getElementById('schedule-button').addEventListener('click', () => {
        if (fcfs_flag) {
            console.log(FCFS(inputArray))
        } else if (sjf_flag) {
            console.log(non_preemptive_sjf(inputArray))
        } else if (pr_flag) {
            console.log(priority_queue(inputArray))
        } else if (rr_flag) {
            console.log(round_robin(5, inputArray))
        } else {
            let txt = document.getElementById('algo-display')
            txt.innerHTML = "ALGORITHM NOT SELECTED!! Select an algorithm."
        }
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