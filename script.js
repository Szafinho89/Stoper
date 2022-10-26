const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.info')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

let secCounter = 0
let minCounter = 0
let timer1;
let number = 0


const addSec = () => {
    if (secCounter < 9) {
        secCounter++
        stopwatch.textContent= `${minCounter}:0${secCounter}`
    } else if (secCounter >= 9 && secCounter < 59) {
        secCounter++
        stopwatch.textContent= `${minCounter}:${secCounter}`
    } else {
        minCounter++
        secCounter = 0
        stopwatch.textContent= `${minCounter}:0${secCounter}`
    }
    
// opcjonalnie ale jednak wyżej widać przedzialy w kolejnosci od 0 w górę.
    // if (secCounter < 59) {
    //     secCounter++
    //     if (secCounter < 10) {
    //     stopwatch.textContent= minCounter + ':0' + secCounter
    //     } else {
    //     stopwatch.textContent= minCounter + ':' + secCounter
    //     }
    // } else {
    //     secCounter = 0
    //     minCounter++
    //     stopwatch.textContent= minCounter + ':0' + secCounter
    // }
}

const handleStart = () => {
    timer1 = setInterval(addSec, 400)
}

const pause = () => {
    clearTimeout(timer1)
}

const createHistory = (x) => {
    timeList.style.display= 'none'
    number++
    let newLi = document.createElement('li')
    let newSpan = document.createElement('span')
    newSpan.textContent= x
    newLi.textContent= `Pomiar nr ${number}:`
    newLi.append(newSpan)
    
    timeList.append(newLi)
}

const stop = () => {
    clearTimeout(timer1)
    time.style.visibility= 'visible'
    time.textContent= 'Ostatni czas: ' + stopwatch.textContent
    createHistory(stopwatch.textContent)
    secCounter = 0
    minCounter = 0
    stopwatch.textContent= minCounter + ':0' + secCounter
}

const archive = () => {
    if (timeList.style.display === 'none') {
        timeList.style.display= 'block'
    } else {
        timeList.style.display= 'none'
    }
}

const reset = () => {
    secCounter = 0
    minCounter = 0
    stopwatch.textContent= minCounter + ':0' + secCounter
    time.textContent= ''
    timeList.remove('li')

}

const showInfo = () => {
    modalShadow.style.display = 'block'
   
}

const closeModal = () => {
    modalShadow.style.display = 'none'

}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', pause)
stopBtn.addEventListener('click', stop)
historyBtn.addEventListener('click', archive)
resetBtn.addEventListener('click',  reset)
infoBtn.addEventListener('click', showInfo)
closeModalBtn.addEventListener('click', closeModal)