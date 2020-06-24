import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from 'react-beautiful-dnd'

const Card1 = ({text, id, index})=>{
    return (
        <Draggable draggableId={String(id)} index={index}>
            {p => (
                <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                    <Card style={styles.cardContainer}>
                        <CardContent>
                            <Typography gutterBottom>{text}</Typography>
                        </CardContent>            
                    </Card>
                </div> 
            )}            
        </Draggable>               
    )
};

const styles={
    cardContainer: {
        marginBottom: 10, 
    },
};

export default Card1;

