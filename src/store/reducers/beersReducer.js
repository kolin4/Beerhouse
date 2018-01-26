const initialState = {
    parseData:{}
}

const reducer = (state = initialState,action) =>{
    if (action.type === 'parseData'){
        
        return {
            parseData:action.data
        }
    }
    return state
}


export default reducer;