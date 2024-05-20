class GlobalCache {

    constructor(){
        this.cache = { };
    }

    get(cacheObjectKeyName){
        return this.cache[cacheObjectKeyName];
    } 
    
    save(cacheObjectKeyName, data){
        this.cache[cacheObjectKeyName] = data;
    }

    put(cacheObjectKeyName, data){
        this.save(cacheObjectKeyName, data);
    }
}

const globalCache = new GlobalCache();