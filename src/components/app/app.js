import React, {Component} from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

export default class App extends Component {
    /*const isLogedIn = true;
    const loginBox = <span>Login please</span>;
    const welcomeBox = <span>Welcome Back</span>;*/

    maxIndex = 100;
    state = {
        todoData: [
            this.createTodoItem('Drink something fghyjn'),
            this.createTodoItem('Learn React+'),
            this.createTodoItem('Doing something 1')
        ],
        term: '',
        filter: 'all' //active,all,done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxIndex++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            console.log(idx);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            return {
                todoData: newArray
            }
        });
    };
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            /* так делать не нужно - не можно изменять существующий state
            todoData.push(newItem);*/
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            }
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        //1.update object
        const oldItem = arr[idx];
        //так делать не нужно
        /*oldItem.important = !oldItem.important;*/
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        //2.construct newArr
        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1);
        const newArray = [...before, newItem, ...after];
        console.log(newArray);

        return {
            arr: newArray
        }

    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };
    onSearchChange = (term) => {
        this.setState({term});
    };
    onFilterChange = (filter) => {
        this.setState({filter});
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done' :
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div>
                {/*{isLogedIn ? welcomeBox : loginBox}*/}
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    addItem={this.addItem}/>
            </div>
        );
    }
};
