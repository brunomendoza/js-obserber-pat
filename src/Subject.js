function Subject(value) {
    this.count = value
    this.observers = []
}

Subject.prototype = {
    subscribe(fn) {
        this.observers.push(fn)
    },
    unsubscribe(fn) {
        this.observers.filter(_fn => _fn != fn)
    },
    notify() {
        this.observers.forEach(fn => fn(this.count));
    },
    increment() {
        this.count = this.count + 1
        this.notify()
    }
}

export default Subject