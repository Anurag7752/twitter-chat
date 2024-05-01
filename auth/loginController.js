import  joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../services/JwtService';

const loginController = {
    async login(req, res, next){
        const loginSchema = joi.object({
            email:joi .sting().email().required(),
            password:joi.sting().pattern(new RegExp(`^[a-zA-20-9]{3,30}`)).required(),
        });
        const {error} = loginSchema.validate(req.body);

        if(error){ 
            return next(error)
        }
        try {
            const user = user .findOne({email: req.body.email});
            if(!user){
                return next(CustomErrorHandler.wrongCredentials());
            }
            // compare the password 
            const match = await bcrypt.compare(req.body.password, user.password);
            if(!match){
                return next (CustomErrorHandler.wrongCredentials());
            }

            // Token
            const  access_token =  JwtService.sign({ _id: user._id, role: user.role});


            res.json({access_token});



        } catch (err) {
            return next(err);
        }
    }
}

export default loginController