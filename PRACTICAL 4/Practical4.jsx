import { useState, useEffect } from "react"
import './PRACTICAL4.css'

const Practical4 = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState({firstName: '', lastName: ''});
    const [animate, setAnimate] = useState(false);
    
    const increment5 = () => {
        for(let i=1; i<=5; i++)
            setCount(prevCount=> prevCount+1)
    }
    
    const triggerAnimation = () => {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
    };
    
    const handleIncrement = () => {
        setCount(count + 1);
        triggerAnimation();
    };
    
    const handleDecrement = () => {
        setCount(count - 1);
        triggerAnimation();
    };
    
    const handleReset = () => {
        setCount(0);
        triggerAnimation();
    };
    
    const handleIncrement5 = () => {
        increment5();
        triggerAnimation();
    };
    
    return(
        <div>
            <h1 className={animate ? 'count-animate' : ''}>Count : {count}</h1>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleIncrement5}>Increment-5</button>
            <br />
            <br />
            First Name: <input type="text" value={name.firstName} onChange={e => setName({...name, firstName: e.target.value})}/>
            <br />
            <br />
            Last Name: <input type="text" value={name.lastName} onChange={e => setName({...name, lastName: e.target.value})}/>
            <h3>First Name: {name.firstName}</h3>
            <h3>Last Name: {name.lastName}</h3>
        </div>
    )
}

export default Practical4