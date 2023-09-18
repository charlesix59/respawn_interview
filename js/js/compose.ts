function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(
        (a, b) =>
            (...args: any) =>
                a(b(...args))
    );
}

const add10 = (x:number) => x + 10;
const mul10 = (x:number) => x * 10;
const add100 = (x:number) => x + 100;

const res = compose(add10, mul10, add100)(10);
console.log(res);