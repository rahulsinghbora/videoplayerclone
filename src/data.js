 export const API_KEY='AIzaSyAU9ZDPmKbYLn8Ip2xyenEr0Rk7L47yW6A';

 export const valueconv=(value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+'M'
    }
    else if(value>=1000){
        return Math.floor(value/1000)+'K'
    }
    else{
        return value;
    }
 }