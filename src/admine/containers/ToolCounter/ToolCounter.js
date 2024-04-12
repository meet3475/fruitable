import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/reducer/toolCounterSlice';

function ToolCounter(props) {

    const dispatch = useDispatch()

    const counter = useSelector((state) => state.counter);

    const handleIncrement = () => {
        dispatch(actions.increment());
    }

    const handleDicrement = () => {
       dispatch(actions.dicrement());
    }

    return (
        <div>
            <h2>TOOLKIT USE COUNTER</h2>
            <button onClick={handleIncrement}>+</button>
            {counter}
            <button onClick={handleDicrement}>-</button>
        </div>
    );
}

export default ToolCounter;