const specialChar = "!@#$%^&*";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const passCheck = (req, res, next) => {
    const {password} = req.body;
    
    var lengthCheck = true;

    if(password.length < 8){
        lengthCheck = false;
        res.status(400).send({"msg": "Password should be atleast 8 characters"});
    }

    var specialCheck = false;
    var numCheck = false;
    var capitalCheck = false;

    for(let i=0; i<password.length; i++){
        let element = Number(password[i]);

        if(Number(element)){
            numCheck = true;
        }

        if(!specialCheck){
            for(let j=0; j<specialChar.length; j++){
                if(specialChar[j] == password[i]){
                    specialCheck = true;
                    break;
                }
            }
        }

        if(!capitalCheck){
            for(let j=0; j<uppercase.length; j++){
                if(password[i] === uppercase[j]){
                    capitalCheck = true;
                }
            }
        }

    }

    if(!specialCheck){
        res.status(400).send({"msg": "Password should contain atleast one special characters"});
    }

    if(!numCheck){
        res.status(400).send({"msg": "Password should contain atleast one number"});
    }

    if(!capitalCheck){
        res.status(400).send({"msg": "Password should contain atleast one capital letter"});
    }

    if(numCheck && lengthCheck && capitalCheck && specialCheck){
        next();
    }
}

module.exports = {
    passCheck
};