//todo: 未充分测试的
const event = function (){
    const topics = {};

    return{
        // 订阅事件
        subscribe(topic,handler){
            if(!topics.hasOwnProperty(topic)){
                topics[topic] = [];
            }
            topics.push(handler);
        },

        // 发布事件
        publish(topic,info){
            if(topics.hasOwnProperty(topic)){
                topics[topic].forEach(handler=>{
                    handler(info);
                })
            }
        },

        // 移除事件
        remove(topic,handler){
            if(!topics.hasOwnProperty(topic)){return}
            let handelIndex = -1;
            topics[topic].forEach((item,index)=>{
                if(item===handler){
                    handelIndex  = index;
                }
            })
            if(handelIndex>0){
                topics[topic].splice(handelIndex,1);
            }
        },

        // 移除所有
        removeAll(topic){
            if (topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
        }
    }
}