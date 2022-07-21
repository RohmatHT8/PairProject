function publishedAt(input){
    const minute = 1000 * 60;
    const hour = minute * 60
    let time = new Date() - input;
    if(time>minute*60){
        return  Math.round(time/hour) + `Hours ago`
    }else{
        return  Math.round(time/minute)+ `Minutes ago`
    }
 }
 
 module.exports = publishedAt