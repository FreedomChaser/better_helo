// updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, 
// updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear

const initialState = {
    userid: 0,
    first_name: '',
    last_name: '',
    gender: '',
    hair_color: '',
    eye_color: '',
    hobby: '',
    birth_day: 0,
    birth_month: '',
    birth_year: 0,
}

const UPDATE_USERID = 'UPDATE_USERID'
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME'
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME'
const UPDATE_GENDER = 'UPDATE_GENDER'
const UPDATE_HAIR_COLOR = 'UPDATE_HAIR_COLOR'
const UPDATE_EYE_COLOR = 'UPDATE_EYE_COLOR'
const UPDATE_HOBBY = 'UPDATE_HOBBY'
const UPDATE_BIRTH_DAY = 'UPDATE_BIRTH_DAY'
const UPDATE_BIRTH_MONTH = 'UPDATE_BIRTH_MONTH'
const UPDATE_BIRTH_YEAR = 'UPDATE_BIRTH_YEAR'

export function updateUserid(userid){
    return{
        type: UPDATE_USERID,
        payload: userid
    }
}
 export function updateFirstName(first_name){
     return{
         type: UPDATE_FIRST_NAME,
         payload: first_name
     }
 }
 export function updateLastName(last_name){
     return{
         type: UPDATE_LAST_NAME,
         payload: last_name
     }
 }
 export function updateGender(gender){
    return{
        type: UPDATE_GENDER,
        payload: gender
    }
}
export function updateHairColor(hair_color){
    return{
        type: UPDATE_HAIR_COLOR,
        payload: hair_color
    }
}
export function updateEyeColor(eye_color){
    return{
        type: UPDATE_EYE_COLOR,
        payload: eye_color
    }
}
export function updateHobby(hobby){
    return{
        type: UPDATE_HOBBY,
        payload: hobby
    }
}
export function updateBirthDay(birth_day){
    return{
        type: UPDATE_BIRTH_DAY,
        payload: birth_day
    }
}
export function updateBirthMonth(birth_month){
    return{
        type: UPDATE_BIRTH_MONTH,
        payload: birth_month
    }
}
export function updateBirthYear(birth_year){
    return{
        type: UPDATE_BIRTH_YEAR,
        payload: birth_year
    }
}

function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USERID:
            return Object.assign({}, state, {userid: action.payload})
        
        case UPDATE_FIRST_NAME:
            return Object.assign({}, state, {first_name: action.payload})
            
        case UPDATE_LAST_NAME:
            return Object.assign({}, state, {last_name: action.payload})

        case UPDATE_GENDER:
            return Object.assign({}, state, {gender: action.payload})

        case UPDATE_HAIR_COLOR:
            return Object.assign({}, state, {hair_color: action.payload})

        case UPDATE_EYE_COLOR:
            return Object.assign({}, state, {eye_color: action.payload})

        case UPDATE_HOBBY:
            return Object.assign({}, state, {hobby: action.payload})

        case UPDATE_BIRTH_DAY:
            return Object.assign({}, state, {birth_day: action.payload})

        case UPDATE_BIRTH_MONTH:
            return Object.assign({}, state, {birth_month: action.payload})

        case UPDATE_BIRTH_YEAR:
            return Object.assign({}, state, {birth_year: action.payload})

    default: return state
    }
}

export default reducer