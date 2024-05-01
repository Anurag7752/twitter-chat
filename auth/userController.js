const userController = {

    me(req, res, next){
        try{
            const user =  await user.findOne({_id: res.user._id});
        }catch(err){

        }
    }



};


export default userController;
