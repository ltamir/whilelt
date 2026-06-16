
import { useEffect, useState } from 'react';
import withEditor from './withEditor';
import '../css/transition.css'

const Directions = {
    N: { x: -5, y: -5, x1: 40, y1: -60, x2: 40, y2: -60 },
    W: { x: 0, y: 0, x1: -40, y1: -60, x2: 80, y2: 60 },
    E: { x: 0, y: 0, x1: 40, y1: -60, x2: -80, y2: 60  },
    S: { x: -5, y: 5, x1: 40, y1: 60, x2: 40, y2: 60 },
}
const Transition = ({ transition, editTransition, editMode, value, onChange, onStart, onSave, onCancel, getDomPoint }) => {
    const [editingTransition, setEditingTransition] = useState(null);
    const onDragStart = (event) => {
        event.dataTransfer.setData('text/plain', transition.title);
    }

    useEffect(() => {
        // onChange(transition.title)
    }, [])

    function getCurvePath(x1, y1, x2, y2) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        // offset for curvature
        const offset = 40;

        return `
        M ${x1} ${y1}
        Q ${mx} ${my - offset} ${x2} ${y2}
    `;
    }

    if (transition.sourceId == transition.targetId) {
        const adj = Directions[transition.fromSide]
        return (
            <g>

                <path
                    d={`
                    M ${transition.x1 + adj.x} ${transition.y1 + adj.y}
                    C ${transition.x1 - adj.x1} ${transition.y1 + adj.y1},
                    ${transition.x1 + adj.x2} ${transition.y1 + adj.y2},
                    ${transition.x1 + adj.x} ${transition.y1 - adj.y}
                    `}
                    fill="none"
                    stroke="black"
                    markerStart="url(#arrow)"
                    markerEnd="url(#arrow)"
                />

                {editingTransition != null && (
                    <EditAlhabet transition={transition} save={(updatedTransition) => editTransition(updatedTransition)} editingTransition={editingTransition} setEditingTransition={setEditingTransition} getDomPoint={getDomPoint} />)}
                <TransitionAlhabet transition={transition} editingTransition={editingTransition} setEditingTransition={setEditingTransition} getDomPoint={getDomPoint} />
            </g>
        )
    }

    return (
        <g>

            <path
                d={getCurvePath(transition.x1, transition.y1, transition.x2, transition.y2)}
                fill="none"
                stroke="black"
                markerEnd="url(#arrow)"
            />
            {editingTransition != null && (
                <EditAlhabet transition={transition} save={(updatedTransition) => editTransition(updatedTransition)} editingTransition={editingTransition} setEditingTransition={setEditingTransition} getDomPoint={getDomPoint} />
            )}
            <TransitionAlhabet transition={transition} editingTransition={editingTransition} setEditingTransition={setEditingTransition} getDomPoint={getDomPoint} />
        </g>


    )
}

const EditAlhabet = ({ transition, save, editingTransition, setEditingTransition, getDomPoint }) => {
    const { x, y } = calcTextPos(transition, getDomPoint)
    const onUpdate = () => {
        save(editingTransition)
        setEditingTransition(null)
    }
    return (
        <foreignObject
            x={x} //- (Math.abs(transition.x1 - transition.x2)) / 2,
            y={y}
            style={{
                width: '50px', height: '30px',

            }}>
            <input
                style={{
                    width: '50px',
                    backgroundColor: '#FFF',
                    opacity: 1
                }}
                value={editingTransition.alphabet}
                onChange={e => setEditingTransition({ ...editingTransition, alphabet: e.target.value })}
                onBlur={onUpdate}
                autoFocus
            />
        </foreignObject>
    )
}

const TransitionAlhabet = ({ transition, setEditingTransition, editingTransition, getDomPoint }) => {
    let x, y;
    if (transition.fromSide != transition.toSide) {
        x = (transition.x1 + transition.x2) / 2;
        y = (transition.y1 + transition.y2) / 2 - 30;
    } else {
        if (transition.fromSide == 'S') {
            x = transition.x1; //(transition.x1 + transition.x2) / 2;
            y = transition.y1 + Directions[transition.fromSide].y1; //(transition.y1 + transition.y2) / 2 +60;
        }else if (transition.fromSide == 'N') {
            x = transition.x1 ; //(transition.x1 + transition.x2) / 2;
            y = transition.y1 + Directions[transition.fromSide].y1;
        } else if (transition.fromSide == 'W' || transition.fromSide == 'E') {
            x = transition.x1 - Directions[transition.fromSide].x1 + Directions[transition.fromSide].x2/3;
            y = transition.y1 + Directions[transition.fromSide].y; 
        }

    }
    return (
        <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            onClick={() => setEditingTransition(transition)}
            className='alphabet'
        >
            {editingTransition ? '' : transition.alphabet}
        </text>
    )
}
const TextDirections = {
    N: { x: -5, y: -5, edgeX: 40, edgeY: -60, textX: 0, textY: 60 },
    W: { x: 30, y: 0, edgeX: 0, edgeY: 0, textX: -25, textY: -25 },
    E: { x: -30, y: 0, edgeX: 0, edgeY: 0, textX: 0, textY: 0 },
    S: { x: -5, y: 5, edgeX: 40, edgeY: +60, textX: -25, textY: 50 },
}
const calcTextPos = (transition, getDomPoint) => {
    let direction = 'W'
    // let { x, y } = getDomPoint((transition.x1 + transition.x2) / 2, (transition.y1 + transition.y2) / 2)
    let x, y;
    if (transition.fromSide != transition.toSide) {
        x = (transition.x1 + transition.x2) / 2;
        y = (transition.y1 + transition.y2) / 2 - 30;
    } else {
        x = transition.x1; //(transition.x1 + transition.x2) / 2;
        y = transition.y1;
    }
    if (transition.fromSide == transition.toSide) {
        direction = transition.fromSide;
    }

    x += TextDirections[direction].textX
    y += TextDirections[direction].textY
    return { x, y }
}


// export default withEditor(Transition);
export default Transition;