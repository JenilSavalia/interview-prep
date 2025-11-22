import { memo, useCallback, useState } from "react";


export const CallbackParent = () => {
    const [parent, setParent] = useState(0);
    const [child1, setChild1] = useState(0);
    const [child2, setChild2] = useState(0);

    const updateParent = useCallback(() => {
        setParent(Math.floor(Math.random() * 100) + 1);
    }, [parent]);

    const updateChild1 = useCallback(() => {
        setChild1(Math.floor(Math.random() * 100) + 1);
    }, [child1]);

    const updateChild2 = useCallback(() => {
        setChild2(Math.floor(Math.random() * 100) + 1);
    }, [child2]);

    // whenever value present in dependency array changes, then only it is treated as new function,
    // otherwise it will keep it memorized and won’t re render the component.



    console.log("Parent rerendered");

    return (
        <>
            <p>Parent - {parent}</p>
            <button onClick={updateParent}>Update Parent</button>
            <Child1 value={child1} updateValue={updateChild1} />
            <Child2 value={child2} updateValue={updateChild2} />
        </>
    );
};


// memo only memorize the value not functions / objects.

// Functions and objects let’s clarify this first, in javascript functions are also objects (first-class objects). 
// So, objects in javascript are of reference type which means it creates a new reference every time in the memory.
//  So, on every update object is making a new reference and this is the reason why memo is not able to memorize it,
//   because memo is thinking this is a new value and it re renders the component. But actually functions are same,
//    so here memo has limitation and “useCallback” comes into picture.

// useCallback says give me a function and I will memorize it even it’s making a new reference in memory every time. 

const Child1 = memo(({ value, updateValue }) => {
    console.log("Child 1 rerendered");

    return (
        <>
            <p>Child 1- {value}</p>
            <button onClick={updateValue}>Update Child 1</button>
        </>
    );
});

const Child2 = memo(({ value, updateValue }) => {
    console.log("Child 2 rerendered");

    return (
        <>
            <p>Child 2- {value}</p>
            <button onClick={updateValue}>Update Child 2</button>
        </>
    );
});
