import React from 'react'

const useReducerDemo = () => {


    // The useReducer() hook is an alternative to the useState() hook that helps to manage complex states in a React application

    const initialState = {
        items: []
    };

    function cartReducer(state, action) {
        switch (action.type) {
            case "ADD_ITEM": {
                const existing = state.items.find(i => i.id === action.payload.id);

                // If item already in cart, increase quantity
                if (existing) {
                    return {
                        ...state,
                        items: state.items.map(item =>
                            item.id === existing.id
                                ? { ...item, qty: item.qty + 1 }
                                : item
                        )
                    };
                }

                // Otherwise, add new item
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, qty: 1 }]
                };
            }

            case "REMOVE_ITEM": {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id)
                };
            }

            case "INCREMENT_QTY": {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    )
                };
            }

            case "DECREMENT_QTY": {
                return {
                    ...state,
                    items: state.items
                        .map(item =>
                            item.id === action.payload.id
                                ? { ...item, qty: item.qty - 1 }
                                : item
                        )
                        .filter(item => item.qty > 0) // remove if qty hits 0
                };
            }

            case "CLEAR_CART":
                return { items: [] };

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (product) => {
        dispatch({ type: "ADD_ITEM", payload: product });
    };

    const increment = (id) => {
        dispatch({ type: "INCREMENT_QTY", payload: { id } });
    };

    const decrement = (id) => {
        dispatch({ type: "DECREMENT_QTY", payload: { id } });
    };

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };


    return (
        <div>
            <h2>Shopping Cart</h2>

            {state.items.map(item => (
                <div key={item.id}>
                    <span>{item.name} — ${item.price} × {item.qty}</span>
                    <button onClick={() => increment(item.id)}>+</button>
                    <button onClick={() => decrement(item.id)}>-</button>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            ))}

            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
}
n

export default useReducerDemo