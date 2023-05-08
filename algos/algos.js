/* console.log("Hello world!") */
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

/* inputArray.push(new Process('P1', 0, 3, 2))
inputArray.push(new Process('P2', 0, 1, 6))
inputArray.push(new Process('P3', 1, 4, 3))
inputArray.push(new Process('P4', 4, 2, 5))
inputArray.push(new Process('P5', 6, 9, 7))
inputArray.push(new Process('P6', 5, 4, 4))
inputArray.push(new Process('P7', 7, 10, 10))
 */

inputArray.push(new Process('P1', 2, 6, 1))
inputArray.push(new Process('P2', 5, 2, 1))
inputArray.push(new Process('P3', 1, 8, 1))
inputArray.push(new Process('P4', 0, 3, 1))
inputArray.push(new Process('P5', 4, 4, 1))


function FCFS() { //works 
    inputArray.sort(arrivalSort)

    let current_time = 0

    inputArray.forEach((process) => {
        let start = 0;

        if (current_time > process.arrival_time)
            start = current_time
        else
            start = process.arrival_time

        let end = start + process.burst_time
        current_time = end

        outputArray.push(new Bar(process.name, start, end))
    })
    console.log(outputArray)
}

function non_preemptive_sjf() {
    inputArray.sort((a, b) => {
        if (a.arrival_time === b.arrival_time)
            return a.burst_time - b.burst_time
        else
            return a.arrival_time - b.arrival_time
    })
    let current_time = 0, total_time = 0
    inputArray.forEach((process) => {
        total_time += process.burst_time
    })
    console.log(total_time)

    const arrived = [], executing = [], waiting = [], completed = []
    let waiting_time = 0
    //rearranging
    for (let i = 0; i <= total_time; i++) {
        let arrived_process
        let coming = inputArray.filter((arrivals) => {
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
        outputArray.push(new Bar(completed[i].name, start, end)) 
    }
    console.log(outputArray)
}

function priority_queue() { // low number represents higher priority *works*
    inputArray.sort((a, b) => {
        if (a.arrival_time >= b.arrival_time)
            return a.priority - b.priority
        else
            return a.arrival_time - b.arrival_time
    })
    let current_time = 0

    for (let i = 0; i < inputArray.length; i++) {
        let start = 0;
        if (current_time > inputArray[i].arrival_time)
            start = current_time
        else
            start = inputArray[i].arrival_time    
        let end = start + inputArray[i].burst_time
        current_time = end
        outputArray.push(new PBar(inputArray[i].name, start, end, inputArray[i].priority)) 
    }
    console.log(outputArray)
    
}

function round_robin(quanta) {
    
}

//FCFS()
//priority_queue()

//////////////////////////////////////////////////////////////////////////////////////////