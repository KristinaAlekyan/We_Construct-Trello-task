import React from 'react';
import List from './components/List';
import {connect} from 'react-redux';
import ActionBtn from './components/ActionBtn'
import { DragDropContext } from 'react-beautiful-dnd';
import {sorter} from './actions';

function App(props) {  
  
  const {lists} = props;
  const onDragEnd = (result) => {
    const { dest, source, draggableId, type } = result;;
    if(!dest){
      return;
    }

    props.dispatch(
      sorter(
        source.droppableId,
        dest.droppableId,
        source.index,
        dest.index,
        draggableId,
      )
    );
  };

  return (
    <div style= {{backgroundColor: "lightblue", height: "100vh"}}>
      <DragDropContext  onDragEnd={onDragEnd}>
      <div >
        <h1>Trello Task</h1>
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
    </div> 
  )
}
const styles = {  
  listsCont: {
    display: "flex", 
    flexDirection: "row", 
  },  
  actionBtnCon: {
    height: 30,
    width: 100,
  }
};

const mapStateToProps= (state)=> {
  return {
    lists : state.lists
  }
}

export default connect(mapStateToProps)(App);




