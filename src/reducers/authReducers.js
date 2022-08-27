export const actions = {
    UPDATE_SIGN_IN: 'UPDATE_SIGN_IN'
}

export const SignInReducer = (state, action) =>{
    switch(action.type){
        case 'UPDATE_SIGN_IN':
            console.log('sign in')
            return {userToken: action.payload.userToken, user: action.payload.user}
        default:
            return state;
    }
}