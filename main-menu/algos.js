/* console.log("Hello world!") */
let process_no = 1

let Process = function (name, arrival_time, burst_time, priority) {
    this.name = name
    this.arrival_time = arrival_time
    this.burst_time = burst_time
    this.priority = priority
    return this
};

let Bar = function (name, start, end) {
    this.name = name
    this.start = start
    this.end = end
    return this
};

let PBar = function (name, start, end, priority) {
    this.name = name
    this.start = start
    this.end = end
    this.priority = priority
    return this
};

let arrivalSort = (a, b) => {
    if (a.arrival_time < b.arrival_time)
        return -1
    if (a.arrival_time > b.arrival_time)
        return 1
    return 0
}

let inputArray = []
//let outputArray = []

function fill_inputArray(at, bt, pr) {
    inputArray.push(new Process('P' + process_no, at, bt, pr))
    process_no++
}

function console_process() {
    console.log(inputArray)
}

function FCFS(arr) { //works 
    
    //console.log('a0 : ' + arr[0].arrival_time)
    arr.sort(arrivalSort)
    const out = []

    let current_time = 0

    arr.forEach((process) => {
        let start = 0;

        if (current_time > process.arrival_time)
            start = current_time
        else
            start = process.arrival_time

        let end = start + process.burst_time
        current_time = end
        
        out.push(new PBar(process.name, start, end, 0))
    })
    console.log(out)
    return out
}

/* function non_preemptive_sjf(arr) { // works (needs review)
    const out = []
    arr.sort((a, b) => { // sort (if arrival time same then sorting by burst time)
        if (a.arrival_time === b.arrival_time)
            return a.burst_time - b.burst_time
        else
            return a.arrival_time - b.arrival_time
    })
    let current_time = 0, total_time = 0
    arr.forEach((process) => {
        total_time += process.burst_time // calculating total time for scheduling
    })
    console.log(total_time)

    const executing = [], waiting = [], completed = []
    let waiting_time = 0
    //rearranging
    for (let i = 0; i <= total_time; i++) {
        let arrived_process
        let coming = arr.filter((arrivals) => { // coming: array containing processes with same arrival time i
            return arrivals.arrival_time == i
        })
        if (coming.length == 1) // if the coming array has one process,
            arrived_process = coming[0] // the process is then arriving at time i
        else if (coming.length > 1) {
            coming.sort((a, b) => { 
                return a.burst_time - b.burst_time // sorting by burst time if coming process > 1
            })
            arrived_process = coming.shift() //shifted (the one with smallest burst time) to arrived_process (not an array)
            do {
            waiting.push(coming.shift())
            } while (coming.length) // popped (the one with largest burst time) to waiting list
        }

        if (!executing.length && arrived_process != undefined) { //if executing array is empty,
            executing.push(arrived_process) // push the arrived process in the executing array
            waiting_time = i    // the time at which the process is pushed is the waiting time
        }
        else if (executing.length && arrived_process != undefined) { // if executing array is NOT empty
            waiting.push(arrived_process)   //the arrived process is pushed into waiting queue
            waiting.sort((a, b) => {
                return a.burst_time - b.burst_time  //waiting queue sorted by burst time always
            })  
        }

        if ((executing.length && waiting_time + executing[0].burst_time == i)) {  //if waiting time + burst time of executing process  == current time
            completed.push(executing.pop()) // when the executing process has done executing, it is removed from exeuting array and moved to completed array
            if (waiting.length) { //and if waiting list is not empty
                executing.push(waiting.shift()) //the shortest job will be shifted to executing array
                waiting_time = i    // with waiting time as current time i
            }
        }
    }
    for (let i = 0; i < completed.length; i++) { // for calculation of gantt chart data
        let start = 0;
        if (current_time > completed[i].arrival_time)
            start = current_time
        else
            start = completed[i].arrival_time    
        let end = start + completed[i].burst_time
        current_time = end
        out.push(new PBar(completed[i].name, start, end, 0)) 
    }
    console.log(out)
    return out
} */

function non_preemptive_sjf(arr) {
    const out = []
    const queue = []

    let current_time = 0
    let total_time = 0
    arr.sort((a, b) => { // first sorting processes by arrival time
        return a.arrival_time - b.arrival_time
    })

    arr.forEach((process) => {
        total_time += process.burst_time // calculating total time for scheduling
    })

    while (current_time < total_time) {

        // inserting all arived processes into queue
        while (arr.length != 0 && arr[0].arrival_time <= current_time) {
            queue.push(arr.shift())
        }

        // sorting arrived processes w.r.t burst time
        queue.sort((a, b) => {
            return a.burst_time - b.burst_time
        })

        let exec_process = queue.shift() // top most element of queue

        let start = current_time
        let end = start + exec_process.burst_time
        out.push(new PBar(exec_process.name, start, end, 0))

        current_time = end
    }
    out.forEach((bars) => {
        console.log(bars)
    })
    return out
}

function priority_queue(arr) { // low number represents higher priority *works*
    const out = []
    arr.sort((a, b) => {
        if (a.arrival_time >= b.arrival_time)
            return a.priority - b.priority
        else
            return a.arrival_time - b.arrival_time
    })
    let current_time = 0

    for (let i = 0; i < arr.length; i++) {
        let start = 0;
        if (current_time > arr[i].arrival_time)
            start = current_time
        else
            start = arr[i].arrival_time    
        let end = start + arr[i].burst_time
        current_time = end
        out.push(new PBar(arr[i].name, start, end, arr[i].priority)) 
    }
    console.log(out)
    return out
}

/* function round_robin(quanta, arr) { //works (needs review)
    const out = []
    arr.sort((a, b) => { // first sorting processes by arrival time
        return a.arrival_time - b.arrival_time
    })
    let larIndex = arr.findIndex((b) => {   //finding the index with the largest burst_time
        return b.burst_time == Math.max.apply(Math,arr.map(function(o){return o.burst_time;}))
    })
    console.log("lar: " , larIndex)
    //quanta divide | works
    const quantized = [], completed = []
    let largest_at = arr[arr.length - 1].arrival_time   // largest arrival time in the array (last process)
    for (let i = 0; i < arr.length; i++) {  // for looping through all processes
        let bt = arr[i].burst_time  // burst time of current process (bt)
        const sliced_time = []
        while (bt != 0) {
            if (bt < quanta) { // sliced time array contains all burst times of a process divided into quanta
                sliced_time.push(bt) // if bt smaller than quanta then pushed and move to next process
                break
            }
            sliced_time.push(quanta) // value of quanta is pushed until bt is less than quanta
            bt -= quanta
        }
        quantized.push(sliced_time)
    }
    console.log(quantized) // quantized array contains new burst times of all processes
    // --new processes creating--
    // current processes have their burst time changed
    for (let i = 0; i < arr.length; i++) { 
        arr[i].burst_time = quantized[i][0]
        quantized[i].shift()
        completed.push(arr[i])
    }  // new burst_times are assigned
    console.log(quantized)
    console.log(completed)
    let fact = 1
    do {
        for (let i = 0; i < arr.length; i++) {
            if (quantized[i][0] != undefined) {
                completed.push(new Process(arr[i].name, arr[i].arrival_time + quanta * fact, quantized[i].shift(), arr[i].priority))
                fact++ 
            }
        } 
        console.log(quantized[larIndex].length)
    } // while (quantized[larIndex].length != 0) 
    while (quantized.some((slices) => slices.length !== 0))

    
    // new processes are made in the above do while loop and pushed into the completed array

    completed.sort((a, b) => {
       return a.arrival_time - b.arrival_time
    })
    let current_time = 0

    for (let i = 0; i < completed.length; i++) {
        let start = 0;
        if (current_time > completed[i].arrival_time)
            start = current_time
        else
            start = completed[i].arrival_time    
        let end = start + completed[i].burst_time
        current_time = end
        out.push(new PBar(completed[i].name, start, end, completed[i].priority)) 
    }
    return out
} */

function round_robin(quanta, arr) {
    const out = []
    const queue = []

    arr.sort((a, b) => { // first sorting processes by arrival time
        return a.arrival_time - b.arrival_time
    })
    console.log('a0 : ' + arr[0].arrival_time)
    let total_time = 0
    let current_time = 0

    arr.forEach((process) => {
        total_time += process.burst_time // calculating total time for scheduling
    })

    while (current_time < total_time) {

        // inserting all arived processes into queue
        //console.log('a0 : ' + arr)
        while (arr.length != 0 && arr[0].arrival_time <= current_time) {
            queue.push(arr.shift())
        }

        // moving top to end
        // if current burst time is zero then remove from queue
        let top = queue.shift()
        if (top.burst_time > 0)
            queue.push(top)

        let start = current_time
        let end = start + Math.min(queue[0].burst_time, quanta)
        out.push(new PBar(queue[0].name, start, end, 0))

        queue[0].burst_time -= (end - start)


        current_time = end;
    }
    out.forEach((bars) => {
        console.log(bars)
    })
    return out
}

//////////////////////////////////////////////////////////////////////////////////////////


/* inputArray.push(new Process('P1', 0, 3, 2))
inputArray.push(new Process('P2', 0, 1, 6))
inputArray.push(new Process('P3', 1, 4, 3))
inputArray.push(new Process('P4', 4, 2, 5))
inputArray.push(new Process('P5', 6, 9, 7))
inputArray.push(new Process('P6', 5, 4, 4))
inputArray.push(new Process('P7', 7, 10, 10))
 */

/* 
inputArray.push(new Process('P1', 2, 6, 1))
inputArray.push(new Process('P2', 5, 2, 1))
inputArray.push(new Process('P3', 1, 8, 1))
inputArray.push(new Process('P4', 0, 3, 1))
inputArray.push(new Process('P5', 4, 4, 1)) */

//rr
/* inputArray.push(new Process('P1', 0, 5, 1))
inputArray.push(new Process('P2', 1, 6, 1))
inputArray.push(new Process('P3', 2, 3, 1))
inputArray.push(new Process('P4', 3, 1, 1))
inputArray.push(new Process('P5', 4, 5, 1))
inputArray.push(new Process('P6', 6, 4, 1)) */