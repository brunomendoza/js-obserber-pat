import sleep from "./helper"
import Spot from "./Location"
import Subject from "./Subject"

(() => {
    const value = 0
    const spot = new Spot()
    const subject = new Subject(value)

    const rootElem = document.getElementById("root")
    const lonElem = document.createElement("p")
    const latElem = document.createElement("p")

    const displayElem = document.createElement("div")
    const buttonElem = document.createElement("button")

    buttonElem.innerText = "Add"

    rootElem.appendChild(lonElem)
    rootElem.appendChild(latElem)
    rootElem.appendChild(displayElem)
    rootElem.appendChild(buttonElem)
    
    spot.subscribe(pos => {
        latElem.innerText = "lat: " + pos.coords.latitude
        lonElem.innerText = "lon: " + pos.coords.longitude
    })
    
    spot.subscribe(pos => console.log(pos.coords))
    
    spot.watchPosition({
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
    })

    sleep(10000)
        .then(() => spot.clearWatch())
        .catch(err => console.warn(err))

    displayElem.innerText = value
    subject.subscribe(count => displayElem.innerText = count)
    subject.subscribe(count => console.log("Valor: " + count))
    buttonElem.addEventListener("click", () => subject.increment())
})()
