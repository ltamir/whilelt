
import { useState,  } from 'react';
import '../css/state.css';

const State = ({ state, onDragStart, onAddTransition,onEndTransition, draggingTransition, setDraggingTransition }) => {
    const [hoveredState, setHoveredState] = useState(false)
    // const onDragStart = (event) => {
    //     event.dataTransfer.setData('text/plain', state.title);
    // }
    const onVertexDragOver = (event) => {
        event.preventDefault();
        const title = event.dataTransfer.getData('text/plain')
    }

    const onDirectionClick = (event, direction) => {
        event.stopPropagation();
        onAddTransition(state, direction);
    }
    const onPointerOver = (event) => {
        const rect = event.currentTarget.ownerSVGElement.getBoundingClientRect();

        const mx = event.clientX - rect.left;
        const my = event.clientY - rect.top;
        const dx = mx - state.left;
        const dy = my - state.top;


        const angle = Math.atan2(dx, dy);
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0)
                console.log("right");
            else
                console.log("left");
        } else {
            if (dy > 0)
                console.log("bottom");
            else
                console.log("top");
        }

    }

    function startTransition(fromState, side) {
        setDraggingTransition({
            fromStateId: fromState.id,
            fromSide: side,
            x1: fromState.left,
            y1: fromState.top,
            x2: fromState.left,
            y2: fromState.top
        });
    }
    function onPointerMove(e) {
        if (!draggingTransition) return;

        const { x, y } = getSvgPoint(e);

        setDraggingTransition(t => ({
            ...t,
            x2: x,
            y2: y
        }));
    }
    function onDrop(event, direction) {       
        if (!draggingTransition) return;
        event.stopPropagation()

        onEndTransition(state, direction);

        // {
        //     from: draggingTransition.fromStateId,
        //     to: targetState.id,
        //     fromSide: draggingTransition.fromSide
        // }

        setDraggingTransition(null);
    }
    const pad = 30;
    return (
        <g
            className='state'
            // draggable={true}
            onPointerDown={() => onDragStart(state.id)}
            onPointerEnter={() => setHoveredState(true)}
            onPointerLeave={() => setHoveredState(false)}
            
        >
            <circle
                onPointerOver={onPointerOver}
                cx={state.left}
                cy={state.top}
                r={30}
                fill="white"
                stroke="black"
                strokeWidth="2"
            />
            <text
                x={state.left}
                y={state.top}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {state.title}
            </text>
            {hoveredState && (
                <>
                    <circle cx={state.left} cy={state.top - pad} r={5} fill="black" onPointerDown={(e)=>onDirectionClick(e, "N")} onPointerUp={(e) =>onDrop(e, "N")}/>
                    <circle cx={state.left + pad} cy={state.top} r={5} fill="black" onPointerDown={(e)=>onDirectionClick(e, "W")} onPointerUp={(e) =>onDrop(e, "W")}/>
                    <circle cx={state.left - pad} cy={state.top} r={5} fill="black" onPointerDown={(e)=>onDirectionClick(e, "E")} onPointerUp={(e) =>onDrop(e, "E")}/>
                    <circle cx={state.left} cy={state.top + pad} r={5} fill="black" onPointerDown={(e)=>onDirectionClick(e, "S")} onPointerUp={(e) =>onDrop(e, "S")}/>
                </>
            )}
        </g>
    )
}


export default State