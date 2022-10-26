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
    clearInterval(timer1)   // zabezpieczenie przed wielokrotnym nacisnieciem PLAY
                            // inaczej kazdorazowe klikniecie w play na nowo by odpalalo timer1 i one by sie na siebie nakladaly
    timer1 = setInterval(addSec, 1000)
}

const pause = () => {
    clearInterval(timer1) // tu można było skorzystać z clearTimout(timer1) - tez   dziala
}

const createHistory = (x) => {
    timeList.style.display= 'none'
    number++
    let newLi = document.createElement('li')
    let newSpan = document.createElement('span') //spana mozna dodac inaczej
    newSpan.textContent= x                       //przez innerHTML w newLi
    newLi.textContent= `Pomiar nr ${number}:`
    newLi.append(newSpan)
    timeList.append(newLi)
}

const stop = () => {
    clearInterval(timer1) // tu można było skorzystać z clearTimout(timer1)
    if (stopwatch.textContent !== '0:00') {
        time.style.visibility= 'visible'
        createHistory(stopwatch.textContent)
        time.textContent= 'Ostatni czas: ' + stopwatch.textContent
    }
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
    time.style.visibility= 'hidden'
    timeList.remove('li')
    clearInterval(timer1)
}

const showInfo = () => {
    modalShadow.style.display = 'block'
    modalShadow.classList.toggle('modal-animation')
}

const closeModal = () => {
    modalShadow.style.display = 'none'
    modalShadow.classList.toggle('modal-animation')
}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', pause)
stopBtn.addEventListener('click', stop)
historyBtn.addEventListener('click', archive)
resetBtn.addEventListener('click',  reset)
infoBtn.addEventListener('click', showInfo)
closeModalBtn.addEventListener('click', closeModal)
window.addEventListener('click', e => e.target === modalShadow ? closeModal() : false) //to jest najczesciej uzywany sposób sprawdzenia czy klikamy w modal czy w arenę obok niego - najprostszy zapis