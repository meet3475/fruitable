import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrese, increse } from '../../../redux/action/counter.action';

function Counter(props) {

    const dispatch = useDispatch()

    const CounterVal = useSelector(state => state.counter);
    console.log(CounterVal);

    const handleIncre = () => {
        dispatch(increse())
    }

    const handleDecre = () => {
        dispatch(decrese())
    }

    return (
        <div>
            <button onClick={handleIncre}>+</button>
            {CounterVal.count}
            <button onClick={handleDecre}>-</button>
        </div>
    );
}

export default Counter;