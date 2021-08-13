// Requirements:
//     ● Form to add a new pizza to the menu.
// ○ Must have following properties:
//     ■ name: string // required, unique, max-length 30
// ■ price: number // required, positive, decimal points 2
// ■ heat: number // optional, integer, range 1-3
// ■ toppings: Array<string> // required, min-length 2
// ■ photo: string // optional. Selection from 3-10 hard coded images
// ○ ‘Add pizza’ button
// ■ Adds pizza to the list
// ● Use sessionStorage to store data
// ■ Clears form
// ● Pizza menu:
//     ○ Display all pizzas that are stored in sessionStorage
// ■ Show info about each pizza (name, price, heat, list of toppings, photo)
// ■ Toppings should be displayed as comma separated text
// ■ Heat should be displayed as chilli peppers next to name
// ● Use svg or png image
// ■ ‘Delete’ button
// ● Show confirmation popup before deleting
// ● Removes pizza when confirmed
// ○ Possibility to sort by name (default option), price or heat
// ■ Keep original (oldest to latest) order in sessionStorage

const submitForm = document.querySelector('#form')
const menu = document.querySelector('#menu')
let nameInput = document.querySelector('#name')
let priceInput = document.querySelector('#price')
let addTopping = document.querySelector('#addTopping')
let toppingInput = document.querySelector('#toppings')
let addedToppings = document.querySelector('#addedToppings')
const lightHeatBtn = document.querySelector('#lightHeat')
const mediumHeatBtn = document.querySelector('#mediumHeat')
const heavyHeatBtn = document.querySelector('#heavyHeat')
const showHeat = document.querySelector('#showHeat')
const imageSelection = document.querySelector('#imageSelection')

const sortAZ = document.querySelector('#sort-A-Z')
const sortPrice = document.querySelector('#sort-price')
const sortHeat = document.querySelector('#sort-heat')

let pizzaObjArr = []
let toppings = []
let sortPriceOrder = false
let sortHeatOrder = false
let sortAzOrder = false
let heatLevel = 1
let selectedPizzaImg = 'https://americanpizza.lt/img/picos/manhatano.png'
const hardCodedPizzaImages = [
    'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
    'https://clipart-best.com/img/pizza/pizza-clip-art-5.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTygB2JElC7BySj4pLo8jMYScxlTR9FcSR0Pw&usqp=CAU',
    'https://us.123rf.com/450wm/gar1984/gar19841904/gar1984190400198/121170541-fresh-tasty-pizza-with-pepperoni-isolated-on-white-background-top-view.jpg?ver=6',
    'https://t3.ftcdn.net/jpg/02/16/78/88/360_F_216788898_nP9aPoisuMzj3IvSKGxJAyCRUiSX1PGe.jpg',
    'https://americanpizza.lt/img/picos/manhatano.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYR2KpzcKKtTJAdXoDTld9ynuizoCiP_nB1w&usqp=CAU'
]
const heatPngs = [
    './images/chilli-light.png',
    './images/chilli-medium.png',
    './images/chilli-hot.png',
]

let sessionData = sessionStorage.getItem('savedPizzas') ? JSON.parse(sessionStorage.getItem('savedPizzas')) : []

window.addEventListener('DOMContentLoaded', () => {
    if (sessionData) {
        pizzaObjArr = [...sessionData]
    }
    renderPizzaSelection()
    renderAllPizzas()
})

lightHeatBtn.addEventListener('click', (e) => {
    e.preventDefault()
    heatLevel = 1
    renderHeat()
})
mediumHeatBtn.addEventListener('click', (e) => {
    e.preventDefault()
    heatLevel = 2
    renderHeat()
})
heavyHeatBtn.addEventListener('click', (e) => {
    e.preventDefault()
    heatLevel = 3
    renderHeat()
})
sortPrice.addEventListener('click', () => {
    sortByPrice(pizzaObjArr,)
})
sortAZ.addEventListener('click', () => {
    sortByName(pizzaObjArr)
})
sortHeat.addEventListener('click',() => {
    sortByHeat(pizzaObjArr)
})

function pleaseFillAllFields() {
    const p = document.createElement('p')
    p.textContent = 'Please make sure all fields are correct'
    p.className = 'error'
    const fillAllDiv = document.querySelector('#fillAllFields')
    fillAllDiv.append(p)
}

function renderHeat() {
    showHeat.innerHTML = ''
    const Heat = document.createElement('h3')
    Heat.className = 'heatNumber'
    Heat.textContent = heatLevel
    showHeat.append(Heat)
}

const renderAddedToppings = () => {
    addedToppings.innerHTML = ''
    toppings.forEach((e, index) => {
        const wrapper = document.createElement('div')
        wrapper.className = 'singleTopping'
        const topping = document.createElement('p')
        topping.innerText = e
        const button = document.createElement('button')
        button.innerText = 'X'
        button.className = 'deleteBtn'
        button.addEventListener('click', () => {
            deleteItem(toppings, index, wrapper)
        })
        wrapper.append(topping, button)
        addedToppings.append(wrapper)
    })
}

function renderSelectedPizza() {
    let appendTo = document.querySelector('#selectedImageCon')
    appendTo.innerHTML = ''
    let img = document.createElement('img')
    img.className = 'selectedImage'
    img.src = selectedPizzaImg
    appendTo.append(img)
}

function deleteItem(arr, index, divToRemove) {
    arr.splice(index, 1)
    divToRemove.remove()
    renderAddedToppings()
    renderAllPizzas()
}

function heatSelector(selectedHeat) {
    switch (selectedHeat) {
        case 1:
            return heatPngs[0]
        case 2:
            return heatPngs[1]
        case 3:
            return heatPngs[2]
        default:
            return heatPngs[0]
    }
}

function sortByName(arr) {
    sortAzOrder = !sortAzOrder;
    arr.sort((a, b) => {
        const x = a.name.toUpperCase();
        const y = b.name.toUpperCase();
        return (sortAzOrder ? (x.name > y.name ? 1 : -1) : (x.name < y.name ? 1 : -1));
    });
    renderAllPizzas()
}

function sortByPrice(arr) {
    sortPriceOrder = !sortPriceOrder
    console.log(sortPriceOrder)
    arr.sort((x, y) => {
        return (sortPriceOrder ? y.price - x.price : x.price - y.price)
    });
    renderAllPizzas()
}

function sortByHeat(arr) {
    sortHeatOrder = !sortHeatOrder;
    arr.sort((x, y) => {
        return (sortHeatOrder ? y.heat - x.heat : x.heat - y.heat);
    });
    renderAllPizzas()
}

function renderAllPizzas() {
    menu.innerHTML = ''
    pizzaObjArr.forEach((e, index, array) => {
        let singleItemCon = document.createElement('div')
        singleItemCon.className = 'singleItemCon'
        let imgWrapper = document.createElement('div')
        let pizzaImg = document.createElement('img')
        pizzaImg.className = 'pizza-img'
        pizzaImg.src = e.image
        let leftSideWrapper = document.createElement('div')
        leftSideWrapper.className = 'leftSidePizzaItemWrapper'
        let pizzaDescriptionCon = document.createElement('div')
        pizzaDescriptionCon.className = 'pizzaDescriptionCon'
        let pizzaName = document.createElement('p')
        pizzaName.innerText = 'Name: ' + e.name
        let pizzaPrice = document.createElement('p')
        pizzaPrice.innerText = 'Price: ' + e.price + '$'
        let heatIndicatorCon = document.createElement('div')
        let heatImg = document.createElement('img')
        heatImg.className = 'chilliIcon'
        heatImg.src = heatSelector(e.heat)
        let toppingsList = document.createElement('div')
        toppingsList.className = 'toppingsList'
        let toppingsP = document.createElement('p')
        toppingsP.innerText = 'Toppings: '
        e.toppings.forEach((e) => {
            toppingsP.innerText += (e + ', ')
        })
        let deleteBtnCon = document.createElement('div')
        deleteBtnCon.className = 'deleteBtnCon'
        let deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'X'
        deleteBtn.className = 'deleteBtn'
        deleteBtn.addEventListener('click', () => {
            deleteItem(array, index, singleItemCon)
            sessionStorage.setItem('savedPizzas', JSON.stringify(pizzaObjArr))
        })
        imgWrapper.append(pizzaImg)
        heatIndicatorCon.append(heatImg)
        toppingsList.append(toppingsP)
        deleteBtnCon.append(deleteBtn)
        pizzaDescriptionCon.append(pizzaName, pizzaPrice, heatIndicatorCon, toppingsList)
        leftSideWrapper.append(imgWrapper, pizzaDescriptionCon)
        singleItemCon.append(leftSideWrapper, deleteBtnCon)
        menu.append(singleItemCon)
    })
}

function renderPizzaSelection() {
    hardCodedPizzaImages.forEach((e) => {
        const img = document.createElement('img')
        img.className = 'pizzaFormImg'
        img.src = e
        img.addEventListener('click', () => {
            selectedPizzaImg = e
            renderSelectedPizza()
        })
        imageSelection.append(img)
    })
}

addTopping.addEventListener('click', (e) => {
    e.preventDefault()
    if (toppingInput.value.trim().length > 2) {
        toppings.push(toppingInput.value)
        toppingInput.value = ''
    }
    renderAddedToppings()
})

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#fillAllFields').innerHTML = null
    const name = nameInput.value.trim()
    const price = priceInput.value.trim()

    const entry = {
        name: name,
        price: price,
        heat: heatLevel,
        toppings: toppings,
        image: selectedPizzaImg
    }

    if (name !== '' && name.length <= 30 && price !== '' && price.length <= 2 &&
        Number(price) > 0 && toppings.length >= 2) {

    console.log('toppings', toppings)
    pizzaObjArr.push(entry)
    nameInput.value = ''
    priceInput.value = ''
    heatLevel = ''
    toppings = []
    renderAddedToppings()
    } else {
        pleaseFillAllFields()
    }
    renderAllPizzas()
    sessionStorage.setItem('savedPizzas', JSON.stringify(pizzaObjArr))
})

