import AuthService from './auth.service.js';
import AuthRoute from './auth.router.js';

class authController {
    login = async (req, res, next) => {
        const {user_name, password} = req.body;
        const token = await AuthService.login({user_name, password});
        if(token==null){
            return res.status(401).json({ message: 'Invalid user_name or password' });
        }
        return res.status(200).json({token});
    }
    register = async (req, res, next)=>{
        let newUser = {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        await userService.createUser(newUser);
        return res.status(201).json(newUser);
    }
    forgotPassword = async (req, res, next)=>{
        const {email} = req.body;
        const token = await AuthService.forgotPassword(email);
        if(token == null){
            return res.status(404).json({message: "Email not found, please try again"});
        }
        return res.status(200).json({token});
    }
    resetPassword = async (req, res, next)=>{
        const {newpassword, token} = req.body;
        const user = await AuthService.resetPassword(newpassword, token);
        if(user==null){
            return res.status(400).json({message: "Invalid token, please try again"});
        } 
        return res.status(200).json({user});
    }   
}

export default new AuthController();