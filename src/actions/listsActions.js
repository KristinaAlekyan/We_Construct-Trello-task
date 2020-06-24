import {CONSTANTS} from '../actions';


export const addList = title =>{
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title  
    };
};

export const sorter = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId ) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.DRAGG_HAPPENED,
            payload: {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart, 
                droppableIndexEnd,
                draggableId,
            }
        });
    };
};

export const editTitle = (listID, newTitle) => {
    return {
      type: CONSTANTS.EDIT_LIST_TITLE,
      payload: {
        listID,
        newTitle
      }
    };
  };
  
  export const deleteList = listID => {
    return (dispatch) => {
      return dispatch({
        type: CONSTANTS.DELETE_LIST,
        payload: {
          listID
        }
      });
    };
  };


