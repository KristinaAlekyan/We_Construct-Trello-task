import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from 'react-beautiful-dnd'
import {connect} from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {CONSTANTS} from '../actions';


const Card1 = ({ text, id, index, listID, dispatch })=>{
    const handleDeleteCard = (id) => {
        dispatch({
              type: CONSTANTS.DELETE_CARD,
              payload: { id, listID }
        });
    }

    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card style={styles.cardContainer}>
                        <CardContent>
                            <Typography gutterBottom>{text}</Typography>
                            
                        </CardContent>
                        <DeleteOutlineIcon onClick={() => handleDeleteCard(id)}></DeleteOutlineIcon>
                    </Card>
                </div>
            )}
        </Draggable>
    )
};

const styles={
    cardContainer: {
        marginBottom: 10,
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
};

export default connect()(Card1);


