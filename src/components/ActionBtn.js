import React from 'react';
import Textarea from 'react-textarea-autosize';
import Card from '@material-ui/core/Card';
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Card';
import {connect} from 'react-redux';
import {addList, addCard} from '../actions';


class ActionBtn extends React.Component{
    state = {
        formOpen: false,
        text: "",
    };
    openForm = ()=>{
        this.setState({
            formOpen: true,
        });
    };
    closeForm = ()=>{
        this.setState({
            formOpen: false,
        });
    };
    handleInputChange = e =>{
        this.setState({
            text: e.target.value,
        })
    };

    handleAddList = () =>{
        const {dispatch} = this.props;
        const {text} = this.state;
        if (text) {
            this.setState({
                text:""                
            });
            dispatch(addList(text));
        }
        return ;
    };
    handleAddCard = () =>{
        const {dispatch, listID} = this.props;
        const {text} = this.state;
        if (text) {
            this.setState({
                text:""                
            });
            dispatch(addCard(listID, text))
        }
        
    };

    renderAddBtn = () => {
        const {list} = this.props;
        const btnText = list? "Add a list" :"Add a card";                          
        const btnTextOp = list? 1: 0.7;
        const btnTextColor= list? "white": "inherit";
        const btnTextBg = list? "rgba(0,0,0, .2)": "inherit";
    
        return(
            <div  onClick = {this.openForm}
            style={{
                opasity: btnTextOp,
                color: btnTextColor,
                backgroundColor: btnTextBg,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"    
            }}>  
                <Icon>add</Icon>
                <p>{btnText}</p>   
            </div>
        )
    };

    renderForm =() => {
        const {list} = this.props;
        const placeholder = list? "Enter list title..." : "Enter a title for this card...";
        const btnTitle = list? "Add List": "Add card";
        return( 
            <div>
                <Card style={{
                    overflow: "visible", 
                }}>
                    <Textarea
                    placeholder={placeholder}
                    value={this.text}
                    onChange={this.handleInputChange}
                    onBlur= {this.closeForm}
                    style={{
                        resize: "none",
                        width: "100%", 
                        outline: "none",
                        border: "green",
                    }}/>
                </Card>
                <div style={styles.actionCo}>
                    <Button
                        onMouseDown={list?this.handleAddList: this.handleAddCard}                        
                        style={styles.buttonStyle}>
                            {btnTitle} {" "}
                    </Button>
                    <Icon>close</Icon>
                </div>
                
            </div>
        )
    }

    render (){
        return this.state.formOpen? this.renderForm(): this.renderAddBtn();
    }   
}
const styles={
    actionCo:{
        display: "flex",
        justifyContent: "start",
        borderRadius: 3,
        height: "auto", 
        minHeight: 32, 
        padding: 4,
        marginTop: 5,
        marginLeft: 8
    },
    buttonStyle:{
        color: "#fff",
        backgroundColor: "#5aac44", 
        height:18,
        width: 80,
        marginTop:4,
        display: "flex", 
        justifyContent: "center",
    }    
};


export default connect()(ActionBtn);