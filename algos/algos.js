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

let arrivalSort = (a, b) => {
    if (a.arrival_time < b.arrival_time)
        return -1
    if (a.arrival_time > b.arrival_time)
        return 1
    return 0
}

const inputArray = []

const outputArray = []

inputArray.push(new Process('P0', 15, 4, 0))
inputArray.push(new Process('P1', 2, 2, 1))
inputArray.push(new Process('P2', 4, 3, 2))
inputArray.push(new Process('P3', 6, 5, 3))

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
FCFS()

function preemptive_SJF() {
    inputArray.sort(arrivalSort)

    let current_time = 0

    for (let i = 0; i < inputArray.length; i++) {
        let start = 0;
        
        if (current_time > inputArray[i].arrival_time)
            start = current_time
        else
            start = inputArray[i].arrival_time
        
        let end = start + inputArray[i].burst_time

        if (end > inputArray[i+1].arrival_time) {
            end = inputArray[i + 1].arrival_time
            const tempArray = []
            inputArray[i].arrival_time = 0
            inputArray[i].burst_time -= inputArray[i].arrival_time - start;
            tempArray.push(inputArray[i])
        } else if (tempArray.length != 0) {
            tempArray.sort((a, b) => {
                if (a.priority > b.priority)
                    return -1
                if (a.priority < b.priority)
                    return 1    
                return 0
            })
            tempArray.forEach((process) => {
            
            })
        }

        current_time = end
        outputArray.push( new Bar(inputArray[i].name, start, end) )
    }
}

function priority_queue() {
    inputArray.sort((a, b) => {
        if (a.priority > b.priority)
            return -1
        if (a.priority < b.priority)
            return 1    
        return 0
    })
    inputArray.forEach((process) => {
        let start = 0;
        
        if (current_time > process.arrival_time)
            start = current_time
        else
            start = process.arrival_time

        let end = start + process.burst_time
        current_time = end
        
        outputArray.push( new Bar(process.name, start, end) )
    })


}