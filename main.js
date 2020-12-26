/*JS - Calculator */

class Calculator {
constructor(previousOperationTextElement, currentOperationTextElement) {
    this.previousOperationTextElement = previousOperationTextElement
    this.currentOperationTextElement = currentOperationTextElement
    this.clear()
}

clear() {
    this.currentOperation = ''
    this.previousOperation = ''
    this.operation = undefined

}

delete() {
    this.currentOperation = this.currentOperation.toString().slice(0,-1)
}

appendNumber(number) {
    if(number === '.' && this.currentOperation.includes('.')) return
    this.currentOperation = this.currentOperation.toString() + number.toString()
}

chooseOperation(operation) {
    if(this.currentOperation === '') return
    if(this.previousOperation !== ''){
        this.compute()
    }
    this.operation = operation
    this.previousOperation = this.currentOperation
    this.currentOperation = ''
}

compute() {
    let computation
    let prev = parseFloat(this.previousOperation)
    let current = parseFloat(this.currentOperation)
    if(isNaN(prev)||isNaN(current)) return
    switch(this.operation){
        case '+': 
            computation = prev + current
            break
        case '-': 
            computation = prev - current
            break
        case '*': 
            computation = prev * current
            break
        case '÷': 
            computation = prev / current
            break
        case '^': 
            computation = prev ** current
            break
        case 'MOD': 
            computation = prev % current
            break
        default:   
            return
    }
    this.currentOperation=computation
    this.operation = undefined
    this.previousOperation = ''
}

getDisplayNumber(number) {
    let stringNumber = number.toString()
    let integerDigits = parseFloat(stringNumber.split(','[0]))
    let decimalDigits = stringNumber.split('.')[1]
    let integerDisplay

    if(isNaN(integerDigits)){
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('eng',{maximumFractionDigits:0})
    }

    if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
    } else {
    return integerDisplay
    }
}

updateDisplay() {
    this.currentOperationTextElement.innerText = this.getDisplayNumber(this.currentOperation)
    if(this.operation!= null){
    this.previousOperationTextElement.innerText = `${this.getDisplayNumber(this.previousOperation)} ${this.operation}`
    } else {
        this.previousOperationTextElement.innerText = ''
    }
}
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperationTextElement = document.querySelector('[data-previous-operation]')
const currentOperationTextElement = document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)


numberButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
})
})


operationButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
})
})


equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})


/*JS - ToDo */

function createTask(){
    let newLi = document.createElement('li')
    let labelValue = document.querySelector('[label-task]').value
    let newText = document.createTextNode(labelValue)

    newLi.appendChild(newText)

    if(labelValue === ''){
        alert('Ingresa una tarea pendiente :)')
    } else{
        document.querySelector('ul').appendChild(newLi)
    }
    document.querySelector('[label-task]').value=''

    let taskLi = document.querySelectorAll('li')

    taskLi.forEach(task =>{
        let span = document.createElement('span')
        let textSpan = document.createTextNode('\u00D7')
        span.className = 'delete'
        span.appendChild(textSpan)
        task.appendChild(span)
    })

    let deleteLi = document.querySelectorAll('.delete')
    deleteLi.forEach(button=>{
        button.addEventListener('click',function(){
            let div=this.parentElement
            div.style.display = 'none'
        })
    })
}


let taskLi = document.querySelectorAll('li')

taskLi.forEach(task =>{
    let span = document.createElement('span')
    let textSpan = document.createTextNode('\u00D7')
    span.className = 'delete'
    span.appendChild(textSpan)
    task.appendChild(span)
})


let deleteLi = document.querySelectorAll('.delete')
deleteLi.forEach(button=>{
    button.addEventListener('click',function(){
        let div=this.parentElement
        div.style.display = 'none'
    })
})


let checkedLi = document.querySelector('ul')
checkedLi.addEventListener('click',function(ev){
    let prevText = ev.target.innerText
    if( ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked')
    }
},false)


let addTask = document.querySelector('[add-task]') 
addTask.addEventListener('click', button =>{
    createTask()
})


    