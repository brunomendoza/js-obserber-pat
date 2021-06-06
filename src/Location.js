function Spot() {
    this.position = null
    this.subscribers = []
    this.error = null
}

Spot.prototype.subscribe = function(fn) {
    this.subscribers.push(fn)
}

Spot.prototype.unsubscribe = function(fn) {
    this.subscribers = this.subscribers.filter(_fn => fn != _fn)
}

Spot.prototype.notify = function() {
    this.subscribers.forEach(fn => fn(this.position));
}

Spot.prototype.clearWatch = function() {
    navigator.geolocation.clearWatch(this.id)
}

Spot.prototype.watchPosition = function(opts) {
    this.id = navigator.geolocation.watchPosition(pos => {
        this.position = pos
        this.notify()
    },
    err => console.warn(err),
    opts)
}

export default Spot