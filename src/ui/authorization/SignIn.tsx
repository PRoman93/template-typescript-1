import React, {ChangeEvent, useState} from "react";
import Input from "../common/Input";
import Link from "../common/LInk";
import Button from "../common/Button";
import Title from "../common/Title";
import styles from "./Auth.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";




const SignIn: React.FC<{}> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    //пример UseSelector Достаем данные из store
    //const valueOfInputEmail = useSelector((state: AppStoreType) => state.signIn.email);

    const dispatch = useDispatch();

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>{
       return setEmail(e.currentTarget.value)
    }
    const changePassword = (e: ChangeEvent<HTMLInputElement>) =>{
        return setPassword(e.currentTarget.value)
    }
    const changeRememberMe = (e: ChangeEvent<HTMLInputElement>) =>{
       return !rememberMe ? setRememberMe(true): setRememberMe(false)
    }

    const sendSignInFormValues = () =>{
        return(
            dispatch({type: 'SET-SIGN-IN-FORM-VALUES',
                email: email,
                password: password,
                rememberMe: rememberMe})
        )
    }

    return (

            <div className={styles.wrapperOfAuth}>
                <Title title={'sign-in'}/>
                <div><Input type="text" placeholder='email' value={email} onChange={changeEmail}/></div>
                <div><Input type="password" placeholder='password' value={password} onChange={changePassword}/></div>
                <div><Link way={'/forgot'} wordOfLink={'Forgot password?'}/></div>
                <div><Input type={"checkbox"} checked={rememberMe} onChange={changeRememberMe}/>Remember Me</div>
                <div><Button typeOfButton={"button"}
                             actionOfButton={sendSignInFormValues}
                             nameOfButton='Sign In'/></div>
                <div><Link way={'/register'} wordOfLink='Registration'/></div>
            </div>

    )

}

export default SignIn