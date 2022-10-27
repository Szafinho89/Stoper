const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.fa-question')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

let secCounter = 0
let minCounter = 0
let timer1
let number = 0

const colorBtn = document.querySelector('.fa-paintbrush')
const colorPanel = document.querySelector('.colors')
const colorOne = document.querySelector('.one')
const colorTwo = document.querySelector('.two')
const colorThree = document.querySelector('.three')
let root = document.documentElement //?!?!?!?!?!?!?!?!?!?!?!?!!?

const addSec = () => {
	if (secCounter < 9) {
		secCounter++
		stopwatch.textContent = `${minCounter}:0${secCounter}`
	} else if (secCounter >= 9 && secCounter < 59) {
		secCounter++
		stopwatch.textContent = `${minCounter}:${secCounter}`
	} else {
		minCounter++
		secCounter = 0
		stopwatch.textContent = `${minCounter}:0${secCounter}`
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
	clearInterval(timer1) // zabezpieczenie przed wielokrotnym nacisnieciem PLAY
	// inaczej kazdorazowe klikniecie w play na nowo by odpalalo timer1 i one by sie na siebie nakladaly
	timer1 = setInterval(addSec, 200)
}

const pause = () => {
	clearInterval(timer1) // tu można było skorzystać z clearTimout(timer1) - tez   dziala
}

const createHistory = x => {
	timeList.style.display = 'none'
	number++
	let newLi = document.createElement('li')
	newLi.innerHTML = `Pomiar nr ${number}: <span>${x}</span>`
	timeList.append(newLi)
}

const stop = () => {
	clearInterval(timer1) // tu można było skorzystać z clearTimout(timer1)
	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		createHistory(stopwatch.textContent)
		time.textContent = 'Ostatni czas: ' + stopwatch.textContent
	}
	secCounter = 0
	minCounter = 0
	stopwatch.textContent = minCounter + ':0' + secCounter
}

const archive = () => {
	//tu jednak jest raczej dobrze zrobione bo sam nadalem display: 'none' w funkcji createHistory() - czyli historia sie tworzy ale pod przykryciem 'none'. A odpalajac funkcje archive zmienia sie to none na block i przy ponownym kliknieciu zmienia sie z block na none

	if (timeList.style.display === 'none') {
		timeList.style.display = 'block'
	} else {
		timeList.style.display = 'none'
	}
}

const reset = () => {
	secCounter = 0
	minCounter = 0
	stopwatch.textContent = minCounter + ':0' + secCounter
	time.style.visibility = 'hidden'
	timeList.remove('li')
	clearInterval(timer1)
}

const showInfo = () => {
	//to jest ciekawe, bo pierwotnie w elemencie modalShadow czyli w tagu <div class="modal-shadow"> nie ma ustawionego atrybutu style na display:none - jak widac w tym divie nie ma NIC poza klasą. I dopiero w klasie sa podane wlasciwosci z wartosciami,a przeciez używając tutaj w modalShadow.style.display to tak jakbysmy byli wewnatrz tego tagu w HTMLu - czyli on nie ma teraz ani display none ani display block (pomimo tego co jest w CSS) !!!!! - dlatego w ifie sprawdzamy czy jest różny od 'block' a nie czy jest === 'none' (bo nie jest, bo nie ma tam NIC) -
	if (modalShadow.style.display !== 'block') {
		modalShadow.style.display = 'block'
	} else {
		modalShadow.style.display = 'none'
	}
	modalShadow.classList.toggle('modal-animation')
}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', pause)
stopBtn.addEventListener('click', stop)
historyBtn.addEventListener('click', archive)
resetBtn.addEventListener('click', reset)
infoBtn.addEventListener('click', showInfo)
closeModalBtn.addEventListener('click', showInfo)
window.addEventListener('click', e =>
	e.target === modalShadow ? showInfo() : false
)
//to jest najczesciej uzywany sposób sprawdzenia czy klikamy w modal czy w arenę obok niego - najprostszy zapis

// const colorBtn = document.querySelector('.fa-paintbrush')
// const colorPanel = document.querySelector('.colors')
// const colorTwo = document.querySelector('.two')
// let root = document.documentElement ?!?!?!?!?!?!?!?!?!?!?!?!!?


colorBtn.addEventListener('click', () => {
    colorPanel.classList.toggle('show-colors')
})

colorOne.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'rgb(250, 20, 6)')
    root.style.setProperty('--hover-color', 'rgb(209, 33, 24)')//chyba niepotrzebne to
})

colorTwo.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'rgb(6, 173, 250)')
    root.style.setProperty('--hover-color', 'rgb(28, 145, 199)')//chyba niepotrzebne to
})

colorThree.addEventListener('click', () => {
    root.style.setProperty('--first-color', 'rgb(0, 255, 42)')
    root.style.setProperty('--hover-color', 'rgb(28, 209, 58)')//chyba niepotrzebne to
})
