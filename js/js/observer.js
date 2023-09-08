class Subject {
    constructor() {
        this.Observers = [];
    }
    add(observer) {
        this.Observers.push(observer);
    }
    remove(observer) {

        this.Observers = this.Observers.filter((item) => item !== observer);
    }
    notify() {
        this.Observers.forEach((callback) => {
            callback();
        });
    }
}
function msg1(){
    console.log(11);
}
function msg2(){
    console.log(22);
}
let sub = new Subject();
sub.add(msg1);
sub.add(msg2);
sub.notify();
sub.remove(msg1);
sub.notify();

