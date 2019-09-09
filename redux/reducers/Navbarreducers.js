const initialState = {
    Home: "/",
    User: "/user"
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'HOME_NAVNAVVIGATOR':
            return Object.assign({}, state, {
                Home: state.Home
            })
        case 'USER_NAVNAVVIGATOR':
            return Object.assign({}, state, {
                Home: state.User
            })
        default:
            return state
    }
}