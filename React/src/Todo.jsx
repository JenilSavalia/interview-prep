import React, { useRef, useState, useEffect } from 'react'

const Todo = () => {

    const [todo, setTodo] = useState([
        { id: 1, task: "Welcome" }
    ]);

    const [input, setInput] = useState("")

    const add_todo = (tsk) => {
        setTodo((prev) => [...prev, { id: prev[prev.length - 1].id + 1, task: inputref.current.value }])
    }
    const remove_todo = (id) => {
        setTodo(prev => prev.filter(t => t.id != id))
    }


    // uncontrolled input
    const inputref = useRef();

    // useRef is gives mutable object with .current property that persists across renders

    // NOTE : IN react component re-renders after every state change
    // ex : when ever we type in controlled input field and state is changes in useState, component is re-rendered

    // therefore usRef provides a object which upon updating persist without re-rendering.

    // It’s extremely useful for accessing DOM elements

    // ex : <input type="text" ref={inputref} />
    //  ^ here inputref object's current property points to DOM's input node, so now we can directly refer from ref object


    // const state = useState(0);   // triggers UI update ❗
    // const ref = useRef(0);       // does NOT trigger update


    // ✅ Example: How useRef stores a DOM element

    // const inputRef = useRef();

    // return (
    //     <input ref={inputRef} />
    // );

    // inputRef.current   // ← this is the actual DOM node <input>


    // inputRef.current.value       // read DOM value
    // inputRef.current.focus()     // call DOM method
    // inputRef.current.style.color = "red";   // change style

    //     🎉 Final Summary
    // useRef does NOT store DOM data

    // Instead…

    // ✔ useRef stores a reference to the DOM node
    // ✔ The DOM node itself stores the data
    // ✔ You use ref.current to access that data



    return (
        <>
            <div>Todo App</div>


            {/* controlled field */}
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            {input}
            {/* uncontrolled field */}
            <input type="text" ref={inputref} />
            <button onClick={() => add_todo(input)}
            >Add</button>
            {
                todo.map((t) => (
                    <>
                        <p>{t.task}</p>
                        <button onClick={() => remove_todo(t.id)}>Remove</button>
                    </>
                ))
            }
        </>
    )
}

export default Todo