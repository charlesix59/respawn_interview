const eventEmitter={
    list:{},
    /**
     * 用来订阅事件
     * @param {string} event 事件名称
     * @param {function} fn 绑定的函数
     * */
    on(event,fn){
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        const _this = this;
        (_this.list[event]||(_this.list[event]=[])).push(fn)
        return _this
    },
    /**
     * 取消订阅
     * @param {string} event 事件名称
     * @param {function} fn 绑定的函数
     * */
    off(event,fn){
        const _this = this
        let fns = _this.list[event]
        // 如果缓存列表中没有相应的 fn，返回false
        if(!fns){
            return false
        }
        if(!fn){
            // fns && fns.length=0 是为了防止fns为null，这样写如果fns为null则直接结束，如果不为null则将fns设为空
            fns && (fns.length=0)
        }
        else{
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            for (let i=0,len = fns.length;i<len;i++){
                if(fns[i]===fn){
                    fns.splice(i,1)
                    break
                }
            }
        }
        return this
    },
    /**
     * 绑定一次
     * @param {string} event 事件名称
     * @param {function} fn 绑定的函数
     * */
    once(event,fn){
        const _this = this
        function on(){
            // 当调用on时，首先会将on从调度中心解除
            // 然后将会调用fn函数
            // 因为在emit中调用on函数时，this的指向也是eventEmitter对象，所以调用_this.off是完全没问题的
            // 况且将fn保存到数组中时形成了闭包，_this的值已经确定
            _this.off(event,on)
            fn.apply(_this,arguments)
        }
        on.fn = fn
        // 将on绑定到调度中心中
        this.on(event,on)
        return this
    },
    /**
     * 启动事件
     * */
    emit(){
        let _this = this
        let event = [].shift.call(arguments),fns = _this.list[event]
        if(!fns||fns.length===0){
            return false
        }
        fns.forEach(fn=>{
            fn.apply(_this,arguments)
        })
        return _this
    }
}

function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

// 输出：
// 用户1订阅了: Javascript 发布-订阅模式
// 用户3订阅了: Javascript 发布-订阅模式
// 用户1订阅了: Javascript 发布-订阅模式
// 用户3订阅了: Javascript 发布-订阅模式
// 用户4订阅了: Javascript 观察者模式