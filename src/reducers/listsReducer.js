import {CONSTANTS} from '../actions/index';

let listID = 0;
let cardID = 0;

const initialState = [];

const listsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id:  listID,
         }
        listID += 1;
        return [...state, newList];

        case CONSTANTS.ADD_CARD:{
            const newCard = {
                text: action.payload.text,
                id: cardID,
            } 
            cardID +=1;

        const newState=state.map(list =>{
            if(list.id === action.payload.listID){
                return{
                    ...list,
                    cards: [...list.cards, newCard]
                };
            } else{
                return list;
            }
        });
        return newState;
        }

        case CONSTANTS.EDIT_LIST_TITLE: {
            const { listID, newTitle } = action.payload;
      
            const list = state[listID];
            list.title = newTitle;
            return { ...state, [listID]: list };
        }
      
        case CONSTANTS.DELETE_LIST: {
            const { listID } = action.payload;
            const newState = state;
            delete newState[listID];
            return newState;
        }



        case CONSTANTS.DRAG_HAPPENED:
            const {
              droppIdStart,
              droppIdEnd,
              droppIndexEnd,
              droppIndexStart,   
            } = action.payload;

            if (droppIdStart === droppIdEnd) {
              const list = state[droppIdStart];
              const card = list.cards.splice(droppIndexStart, 1);
              list.cards.splice(droppIndexEnd, 0, ...card);
              return { ...state, [droppIdStart]: list };
            }
      
            
            if (droppIdStart !== droppIdEnd) {
              const listStart = state[droppIdStart];
              const card = listStart.cards.splice(droppIndexStart, 1);
              const listEnd = state[droppIdEnd];
              listEnd.cards.splice(droppIndexEnd, 0, ...card);
              return {
                ...state,
                [droppIdStart]: listStart,
                [droppIdEnd]: listEnd
              };
            }
            return state;
      

        default:
            return state;
    }
};

export default listsReducer; 



