import React from "react";

const initialState = {
    email: '',
    loading: false,
    disabled: false,
    error: null,
    emailApproved: false
}

const forgotReducer = (state = initialState, action: any) =>{
   switch (action.type) {
       case 'RESTORE-FORGOT-PASSWORD': {
         return {
             ...state, email: action.email
         }
       }
       case 'SET-LOADING-DATA-FORGOT-PAGE': {
           return {
               ...state,
               loading: action.loading,
               disabled: action.disabled,
               emailApproved: action.emailApproved
           }
       }
       case 'SET-VALUE-ERROR': {
           return {
               ...state,
               error: action.error
           }
       }

   }
   return state
}

export default forgotReducer