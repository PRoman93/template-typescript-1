import React, {useEffect, useState} from "react";
import Link from "../../common/LInk";
import styles from './Header.module.css'
import {CARDS_TABLE, DECKS_TABLE, FORGOT, PROFILE, REGISTER, SET_NEW_PASS, SIGN_IN} from "../../common/Constants";
import Button from "../../common/Button";


type OwnPropsType = {
    login: boolean,
    tokenIsClear: ()=>void
}
const Header = (props: OwnPropsType) => {

  const tokenIsClear = () =>{
      props.tokenIsClear();
  };


    return (
        <div className={styles.wrapperOfHeader}>
            <Link way={SIGN_IN} wordOfLink={'sign-in'}/>
            <Link way={REGISTER} wordOfLink={'register'}/>
            <Link way={FORGOT} wordOfLink={'forgot'}/>
            <Link way={SET_NEW_PASS} wordOfLink={'set-new-pass'}/>
            <Link way={PROFILE} wordOfLink={'profile'}/>
            <Link way={DECKS_TABLE} wordOfLink={'decks'}/>
            <Link way={CARDS_TABLE} wordOfLink={'cards'}/>
            {/*<Button typeOfButton={'button'} actionOfButton={tokenIsClear} nameOfButton={'logout'}/>*/}
           { props.login? <Button typeOfButton={'button'} actionOfButton={tokenIsClear} nameOfButton={'logout'}/>:null}

        </div>
    )
}
export default Header
