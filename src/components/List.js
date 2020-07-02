import React from 'react';
import Card1 from './Card';
import ActionBtn from './ActionBtn';
import { Droppable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import {CONSTANTS} from '../actions';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const List = ({ title, cards, listID, index, dispatch }) =>{
    const handleDeleteList = (id) => {
        dispatch({
              type: CONSTANTS.DELETE_LIST,
              payload: { id }
        });
    }
    return(
        <div style={styles.listWrapper} >
            <div style={styles.listContent}> 
                <Droppable droppableId={String(listID)}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} >
                            <div style={styles.listHeader}>
                                <div>
                                    <h3 > {title}</h3>
                                </div>
                                <DeleteOutlineIcon onClick={() => handleDeleteList(listID)}></DeleteOutlineIcon>
                            </div>
                            <div style={styles.cardContainer}>
                                {cards.map((c, index)=>(
                                    <div style={styles.cardContent}>
                                        <Card1  key={c.id} index={index} text={c.text} id={c.id} listID={listID}  />
                                    </div>
                                ))
                                }
                            </div>
                            
                            <div style={styles.actionBtnWrapper}>
                                <div style={styles.actionBtnCont}>
                                    <ActionBtn listID={listID} />
                                </div>                                
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>              
    );
};
const styles={
    listWrapper:{            
        width: 272,
        marginTop: 0,
        marginLeft: 4,
        height: "100%",
        display: "inline-block",
    },
    listContent: {
        backgroundColor: "#ebecf0",
        marginRight: 3,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%"
    },

    listHeader: {
        paddingTop: 10,
        paddingLeft: 8,
        paddingRight: 8,   
        display: "flex"  ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 20,
    },
    cardContainer:{        
        flex: "1 1 auto",
        marginBottom: 0,
        marginLeft: 4,
        marginRight: 4,
        paddingBottom: 0,
        paddingLeft: 4,
        paddingRight: 4,
        minHeight: 0,
    },
    cardContent:{        
        borderRadius: 3,
        cursor: "pointer",
        marginBottom: 8,
        maxWidth: 300,
        minHeight: 20,
    },
    actionBtnWrapper:{   
        border: "none",
        marginBottom: 4,
        maxHeight: 162,
        minHeight: 54, 
        color: "#5e6c84"
    },
    actionBtnCont:{
        backgroundColor: "#ebecf0",
        height: "auto",
        minHeight: 32,
        padding: 4,    
        borderadius:4, 
    }

}

export default connect()(List);
