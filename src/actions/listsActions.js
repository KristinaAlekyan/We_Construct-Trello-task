import {CONSTANTS} from '../actions';


export const addList = title =>{
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title  
    };
};

export const editListTitle = (listID, newTitle) =>{
    return {
        type: CONSTANTS.EDIT_LIST_TITLE,
        payload: {
            listID,
            newTitle,
        }
    };
};
