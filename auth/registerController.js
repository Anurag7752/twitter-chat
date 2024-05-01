import CustomErrorHandler from "../services/CustomErrorHandler";

import Joi from "joi";

import bcrypt from "bcrypt";
import JwtService from "../services/JwtService";
// import { User } form '../models';

const registerController = {
     async register(req, res,){

        const registerSchema = joi.object({
            name: joi.string().min(4).max(40).required(),
            email:joi .sting().email().required(),
            passwoed:joi.sting().pattern(new RegExp(`^[a-zA-20-9]{3,30}`)).required(),
            Report_password: joi.ref('password')
        });

        const { error } = registerController.validate(req. body);

        if(err){
            return next(err)
        }


    // check uf user is in the database already

    try{
        const exits = await User.exits({email: req.body.email})
        
    if(exits){
        return next(CustomErrorHandler.alreadyExits(`This email is already token.`));
    }
    }catch(err){
        
    }


    // Hash-password

    cnst hashedPassword = await bcrypt.hash(req.body.password, 10);


    //prepare the model

    const{name, email, password} = req.body;
    const user = {
        name,
        email,
        password: hashedPasswoed
    }


    let access_token;

    try {

        const result = await User.save();

    } catch(err){
        return next(err);


        // token

        access_token =  JwtService.sign({ _id: result._id, role: result.role})


    }




    static alreadyExits(message){
        return new CustomErrorHandler(409, message);
    }
    
    }
}


export default registerController;