import {CONSTANTS} from '../actions/index';
import { cloneDeep, findIndex } from 'lodash'
import { act } from 'react-dom/test-utils';

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

            const newState = state.map(list =>{
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

        case CONSTANTS.DELETE_CARD: {
            const { id, listID } = action.payload
            let newState = cloneDeep(state);
            let list = newState.find(item => item.id === listID)
            let cards = list.cards
            const index = findIndex(cards, { id })
            cards.splice(index, 1); 
            return [ ...newState ];
        }
        case CONSTANTS.DELETE_LIST: {
            const { id } = action.payload;
            let newState = cloneDeep(state);
            const index = findIndex(newState, { id })
            newState.splice(index, 1); 
            return newState;
        }
        case CONSTANTS.DRAGG_HAPPENED:
            let {
                draggableId,
                droppableIdEnd,
                droppableIdStart,
                droppableIndexEnd,
                droppableIndexStart
            } = action.payload;
            let newState = cloneDeep(state);

            droppableIdStart = Number(droppableIdStart);
            droppableIdEnd = Number(droppableIdEnd);

            if (droppableIdStart === droppableIdEnd) {
                let list = {};
                newState.map(item => {
                    if (item.id === droppableIdStart) {
                        list = item
                    }
                });
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
                return [ ...newState ];
            }

            if (droppableIdStart !== droppableIdEnd) {
                let listStart = {},
                    listEnd = {};
                newState.map(item => {
                    if (item.id === droppableIdStart) {
                        listStart = item
                    }
                    if (item.id === droppableIdEnd) {
                        listEnd = item
                    }
                });
                const card = listStart.cards.splice(droppableIndexStart, 1);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
                return [...newState];
            }
            return state;

        case CONSTANTS.EDIT_LIST_TITLE: {
            const {listID, newTitle} = action.payload;
            let newState = cloneDeep(state);
            newState[listID].title=newTitle;
            return [...newState]
            
        }
        default:
            return state;
    }
};

export default listsReducer;


