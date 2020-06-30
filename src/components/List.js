import React from 'react';
import Card1 from './Card';
import ActionBtn from './ActionBtn';
import { Droppable} from 'react-beautiful-dnd';
import {connect} from 'react-redux';

const List = ({ title, cards, listID, index, dispatch }) =>{
    return(
        <Droppable droppableId={String(listID)}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={styles.container}>
                    <div style={styles.title}>
                        <div>
                            <h3 > {title}</h3>
                        </div>
                        <div>
                            <span className="material-icons">more_horiz</span>
                        </div>
                    </div>
                    {cards.map((c, index)=>(
                        <Card1  key={c.id} index={index} text={c.text} id={c.id} listID={listID} />
                    ))
                    }
                    <ActionBtn listID={listID}/>
                    {provided.placeholder}
                </div>
            )}
       </Droppable>
    );
};


const styles={
    container: {
        backgroundColor: "#ccc",
        width: 250,
        marginRight: 7,
        borderRadius: 4,
        height: "100%",
    },
    title:{
        marginLeft: 10,
        display: "flex"  ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: "20",
    }

};

export default connect()(List);
