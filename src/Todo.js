import React from "react";
import style from "./styles/todo.module.css";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <div className={style.todoElement}>
                <h3>{this.props.name}</h3>
            </div>
        );
    }
}
export default Todo;

//import style from "./recipe.module.css";

// const Todo = ({ props }) => {
//     return (
//         <div className="todoElement">
//             <h3>{props.name}</h3>

//         </div>
//     );
// };

// export default Todo;