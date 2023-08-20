import Joi from "joi";

interface Login {
    email: string,
    password: string
}

const Login: Joi.ObjectSchema<Login> = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default Login;