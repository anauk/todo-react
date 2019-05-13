import React, {Component} from 'react';
import "./todo-list-item.css";
//Компонент как класс подходит для dinamic statement
export default class TodoListItem extends Component {
    render(){
        const { label, onDeleted,
            onToggleImportant,
            onToggleDone,
            important, done } = this.props;

        let cli = "todo-list-item";
        if (done){
            cli += ' done';
        }
        if (important){
            cli += ' important';
        }

        return (
            <span className={cli}>
              <span className="todo-list-item-label"
              onClick={ onToggleDone }>
                  {label}>
              </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={ onToggleImportant }>
                <i className="fa fa-exclamation"></i>
            </button>
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={ onDeleted }>
                <i className="fa fa-trash-o"></i>
            </button>
        </span>

        );
    };
}
//Компонент как функция подходит для state statement
/*const TodoListItemFunc = ({label, important = false})=> {

    const liStyle = {
        color: important?'steelblue':'black',
        fontWeight: important?'bold':'normal'
    };

    return (
        <span className="todo-list-item">
              <span className="todo-list-item-label"
                  style = {liStyle}>
                  {label}>
              </span>

            <button type="button"
            className="btn btn-outline-success btn-sm float-right">
                <i className="fa fa-exclamation"></i>
            </button>
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right">
                <i className="fa fa-trash-o"></i>
            </button>
        </span>

);
};*/

