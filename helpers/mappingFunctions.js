const objectToArray=(object)=>{
        let arr=[]
        Object.keys(object).forEach((key,index)=>{
            arr[key]=Object.values(object)[index];
        })
        return arr;
}

module.exports={
    objectToArray
}