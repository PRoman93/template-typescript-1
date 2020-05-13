import axios from 'axios'

const instance = axios.create({
   // withCredentials: true,
    baseURL:"https://neko-cafe-back.herokuapp.com/",
});

export const authApi = {

    login(email: string, password: string, rememberMe: boolean){
        return instance.post("auth/login", {email, password, rememberMe})
            .then(response=>{return response.data})
    },

    forgotPass(email: string, html1: string, html2: string){
        return instance.post('auth/forgot', {email, html1, html2})
            .then(res=>{return console.log(res)})
            //.catch(fal=>console.log(fal))
    },

    register(email: string, password: string){
        return instance.post('auth/register', {email, password})
            .then(res =>res)
    },

    authMe(authToken: string|null){
        debugger
        return instance.post('auth/me', {authToken: authToken})
            .then(res=>res)
            .catch((fal)=>{return fal})
    },

    setNewPass(resetPasswordToken: string | undefined, password: string){
        return instance.post('auth/set-new-password', {resetPasswordToken, password})
            .then(res=>res)
    }
};

