export const randomNumberGenerator = length =>{
    let pin = "";


    for (let i = 0; i < length; i++) {
        //to generate unique number use math.random value between 0 to 0.99
        //math floor will say for eg 4.1 will make it 4
       pin += Math.floor(Math.random() * 10);
        
    }
    return pin;
}