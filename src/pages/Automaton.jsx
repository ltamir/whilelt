import { useRef, useState } from "react";
import State from "../components/State";

import '../css/automaton.css'
import Transition from "../components/Transition";

const Automaton = () => {
    const [states, setStates] = useState([])
    const contsinerRef = useRef(null)

    const addState = () => {
        setStates(prev => {
            if(!contsinerRef.current)return prev;
            const title = 'q' + prev.length;
            let top = prev.length === 0?15:prev[prev.length-1].top;
            let left = prev.length == 0?15 : prev[prev.length-1].left + 100;
            if(prev.length > 0 && left > contsinerRef.current.offsetWidth){
                top += 100;
                left = 15;
            }
            
            return [...prev, {top, left, title, type:'state', width:50}]
        })
    }
    const addTransition = () => {
        setStates(prev => {
            if(!contsinerRef.current)return prev;
            const title = 'q' + prev.length;
            let top = prev.length === 0?15:prev[prev.length-1].top;
            let left = prev.length == 0?15 : prev[prev.length-1].left + 100;
            if(prev.length > 0 && left > contsinerRef.current.offsetWidth){
                top += 100;
                left = 15;
            }
            
            return [...prev, {top, left, title, type:'trx', width:50}]
        })
    }

    const onDragOver = (event) => {
        event.preventDefault()
    }
    const onDrop = (event) => {
        event.preventDefault()
        const title = event.dataTransfer.getData('text/plain')
        const parent = event.currentTarget.getBoundingClientRect();


        setStates(prev => {
            const index = prev.findIndex(q => q.title == title);
            const temp= [...prev]
            temp[index].left = event.clientX - parent.left - temp[index].width/2;
            temp[index].top = event.clientY - parent.top - temp[index].width/2;
            return temp;
        })
    }

    return (
        <div>
            <div>
                <button onClick={addState}>ADD</button>
                <button onClick={addTransition}>ADD</button>
                <span>{states.length}</span>
            </div>
            <div className="automaton-container" ref={contsinerRef} onDragOver={onDragOver} onDrop={onDrop}>
                {/* <Transition transition={{top:15, left:65, title:'1'}} /> */}
                {
                    states.filter(s => s.type== 'state').map(q => <State key={q.title} state={q}/>)
                }
                {
                    states.filter(s => s.type== 'trx').map(q => <Transition key={q.title} transition={q}/>)
                }
            </div>
        </div>
    )
}

export default Automaton;
