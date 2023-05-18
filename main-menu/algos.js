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

const inputArray = []
const outputArray = []

function fill_inputArray(at, bt, pr) {
    inputArray.push(new Process('P' + process_no, at, bt, pr))
    process_no++
}

function console_process() {
    console.log(inputArray)
}

function FCFS(arr) { //works 
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
        
        out.push(new Bar(process.name, start, end))
    })
    console.log(out)
    return out
}

function non_preemptive_sjf(arr) { // works (needs review)
    const out = []
    arr.sort((a, b) => {
        if (a.arrival_time === b.arrival_time)
            return a.burst_time - b.burst_time
        else
            return a.arrival_time - b.arrival_time
    })
    let current_time = 0, total_time = 0
    arr.forEach((process) => {
        total_time += process.burst_time
    })
    console.log(total_time)

    const arrived = [], executing = [], waiting = [], completed = []
    let waiting_time = 0
    //rearranging
    for (let i = 0; i <= total_time; i++) {
        let arrived_process
        let coming = arr.filter((arrivals) => {
            return arrivals.arrival_time == i
        })
        if (coming.length == 1)
            arrived_process = coming[0]
        else if (coming.length > 1) {
            coming.sort((a, b) => {
                a.burst_time - b.burst_time
            })
            arrived_process = coming.shift()
            waiting.push(coming.pop())
        }

        if (!executing.length && arrived_process != undefined) {
            executing.push(arrived_process)
            waiting_time = i
        }
        else if (executing.length && arrived_process != undefined) {
            waiting.push(arrived_process)
            waiting.sort((a, b) => {
                return a.burst_time - b.burst_time
            })
        }
        if ((executing.length && waiting_time + executing[0].burst_time == i)) {
            completed.push(executing.pop())
            if (waiting.length) {
                executing.push(waiting.shift())
                waiting_time = i
            }
        }
    }
    for (let i = 0; i < completed.length; i++) {
        let start = 0;
        if (current_time > completed[i].arrival_time)
            start = current_time
        else
            start = completed[i].arrival_time    
        let end = start + completed[i].burst_time
        current_time = end
        out.push(new Bar(completed[i].name, start, end)) 
    }
    console.log(out)
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

function round_robin(quanta, arr) { //works (needs review)
    const out = []
    arr.sort((a, b) => {
        return a.arrival_time - b.arrival_time
    })
    let larIndex = arr.findIndex((b) => {
        return b.burst_time == Math.max.apply(Math,arr.map(function(o){return o.burst_time;}))
    })
    console.log("lar: " , larIndex)
    //quanta divide | works
    const quantized = [], completed = []
    let largest_at = arr[arr.length - 1].arrival_time
    for (let i = 0; i < arr.length; i++) {
        let bt = arr[i].burst_time
        const sliced_time = []
        while (bt != 0) {
            if (bt < quanta) {
                sliced_time.push(bt)
                break
            }
            sliced_time.push(quanta)
            bt -= quanta
        }
        quantized.push(sliced_time)
    }
    console.log(quantized)
    /* --new processes creating-- */
    // current processes have their burst time changed
    for (let i = 0; i < arr.length; i++) { 
        arr[i].burst_time = quantized[i][0]
        quantized[i].shift()
        completed.push(arr[i])
    } 
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
    } while (quantized[larIndex].length != 0) 
    
    /* console.log(quantized)
    console.log(inputArray) */
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
    console.log(out)
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