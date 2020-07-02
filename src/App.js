import React from 'react';
import List from './components/List';
import {connect} from 'react-redux';
import ActionBtn from './components/ActionBtn'
import { DragDropContext } from 'react-beautiful-dnd';
import {CONSTANTS, sorter} from './actions';
import './App.css';

function App(props) {

  const {lists} = props;
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if(!destination){
      return;
    }
    props.dispatch(
        {
          type: CONSTANTS.DRAGG_HAPPENED,
          payload: {
            droppableIdStart: source.droppableId,
            droppableIdEnd: destination.droppableId,
            droppableIndexStart: source.index,
            droppableIndexEnd: destination.index,
            draggableId: draggableId,
          }
        }
    );
  };

  return (
      <DragDropContext  onDragEnd={onDragEnd}>
      <div >
        <h1 style={styles.titleStyle}>Trello Task</h1>
        <div style = {styles.listsCont}>
          {lists.map(list =>
            <List listID={list.id} key={list.id} title={list.title} cards={list.cards}/>
          )}
          <div style={styles.actionBtnCon}>
            <ActionBtn list/>
          </div>
        </div>
      </div>
      </DragDropContext>    
  )
}
const styles = {
  listsCont: {
    display: "flex",
    flexDirection: "row",
  },
  
  actionBtnCon:{            
    width: 272,
    marginTop: 0,
    marginLeft: 4,
    height: "100%",
    display: "inline-block",
},
  titleStyle:{
    color: "white",
  }
};

const mapStateToProps= (state)=> {
  return{
    lists : state.lists,
    cards: state.cards,
}
};

export default connect(mapStateToProps)(App);