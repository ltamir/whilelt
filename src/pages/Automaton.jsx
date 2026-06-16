import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import State from "../components/State";
import Transition from "../components/Transition";
import '../css/automaton.css'

import x from '../assets/automaton.json'
console.log(x);


const Directions = {
    N: { x: 0, y: -30 },
    W: { x: 30, y: 0 },
    E: { x: -30, y: 0 },
    S: { x: 0, y: 30 },
}
const defaultTransition = { id: crypto.randomUUID(), alphabet: 'ABC', sourceId: '', targetId: '', x1: 0, y1: 0, x2: 0, y2: 0, fromSide: Directions.W, toSide: Directions.E }

const Automaton = () => {
    const [model, setModel] = useState({ states: [], lastState: 0 })
    const [draggingId, setDraggingId] = useState(null);
    const [draggingTransition, setDraggingTransition] = useState({ ...defaultTransition })
    const [transitions, setTransitions] = useState([])
    const containerRef = useRef(null);

    useEffect(() => {
        setDraggingTransition(null);

    }, [])

    const loadExample = () => {
        setModel(x.model)
        setTransitions(x.transitions)
    }

    const addState = () => {
        setModel(prev => {
            if (!containerRef.current) return prev;
            const title = 'q' + prev.lastState;
            const states = [...prev.states]
            let top = states.length === 0 ? 50 : states[states.length - 1].top;
            let left = states.length == 0 ? 50 : states[states.length - 1].left + 100;
            if (states.length > 0 && left > containerRef.current.offsetWidth) {
                top += 100;
                left = 15;
            }
            states.push({ id: crypto.randomUUID(), top, left, title, type: 'state', width: 50, height: 50, transitions: [], isStart: true, isAcepting: false })
            return { states, lastState: prev.lastState + 1 }
        })
    }

    // const addTransition = () => {
    //     setModel(prev => {
    //         if (!containerRef.current) return prev;
    //         const title = "ABC";
    //         const states = [...prev.states]
    //         let top = states.length === 0 ? 15 : states[states.length - 1].top;
    //         let left = states.length == 0 ? 15 : states[states.length - 1].left + states[states.length - 1].width;
    //         if (states.length > 0 && left > containerRef.current.offsetWidth) {
    //             top += 100;
    //             left = 15;
    //         }
    //         states.push({ id: crypto.randomUUID(), top, left, title, type: 'trx', width: 75, height: 50, source: null, to: target })
    //         return { ...prev, states, }
    //     })
    // }
    const editTransition = (transition) => {
        setTransitions(transactions => [...transactions.filter(t => t.id != transition.id), transition])
    }

    // transitions
    function getPointOnCircle(cx, cy, tx, ty, r) {
        const dx = tx - cx;
        const dy = ty - cy;

        const angle = Math.atan2(dy, dx);

        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        };
    }

    const onStartTransition = (state, direction) => {
        const from = getPointOnCircle(
            state.left,
            state.top,
            state.left,
            state.top,
            30
        );

        setDraggingTransition({
            ...defaultTransition,
            sourceId: state.id,
            fromSide: direction,
            x1: state.left + Directions[direction].x,
            y1: state.top + Directions[direction].y,
            x2: state.left,
            y2: state.top,
            alphabet: 'ABC'
        });

    }


    const onEndTransition = (state, direction) => {
        if (draggingTransition) {
            const from = getPointOnCircle(
                state.left,
                state.top,
                draggingTransition.x2,
                draggingTransition.y2,
                30
            );

            const transition = { ...draggingTransition, id: crypto.randomUUID(), targetId: state.id, x2: from.x, y2: from.y, toSide: direction }
            // const transition = { ...draggingTransition, id: crypto.randomUUID(), targetId: state.id, x2: state.left + Directions[direction].x, y2: state.top + Directions[direction].y }
            setTransitions(transitions => [...transitions, transition])
            const startStateIndex = model.states.findIndex(s => s.id == draggingTransition.sourceId)
            const endStateIndex = model.states.findIndex(s => s.id == state.id)
            const states = [...model.states]
            states[startStateIndex].transitions.push(transition)
            states[endStateIndex].transitions.push(transition)
            setModel({ ...model, states })
            setDraggingTransition(null)
        }
    }

    const onDragStart = (id) => {
        setDraggingId(id)
    }

    const getDomPoint = useCallback((svgX, svgY) => {
        const svg = containerRef.current;
        const p = new DOMPoint(svgX, svgY);
        const screenPoint = p.matrixTransform(svg.getScreenCTM());
        return screenPoint
    }, [])
    const getSvgPoint = (event) => {
        const svg = containerRef.current;
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;

        return pt.matrixTransform(
            svg.getScreenCTM().inverse()
        );
    }

    const onDragOver = (event) => {
        if (draggingTransition) {
            const { x, y } = getSvgPoint(event);

            setDraggingTransition(t => ({
                ...t,
                x2: x,
                y2: y
            }));
            return;
        }

        if (!draggingId) return;
        const svg = event.currentTarget;
        const pt = svg.createSVGPoint();

        pt.x = event.clientX;
        pt.y = event.clientY;

        const svgPoint = pt.matrixTransform(
            svg.getScreenCTM().inverse()
        );

        setModel(model =>
        ({
            ...model, states: model.states.map(s =>
                s.id === draggingId
                    ? {
                        ...s, left: svgPoint.x, top: svgPoint.y,
                    }
                    : s
            )

        })
        );
        setTransitions(transitions => transitions.map(t => {
            const updatedTransition = { ...t }
            if (t.sourceId == draggingId) {
                updatedTransition.x1 = svgPoint.x + Directions[t.fromSide].x
                updatedTransition.y1 = svgPoint.y + Directions[t.fromSide].y
            } else if (t.targetId == draggingId) {
                updatedTransition.x2 = svgPoint.x + Directions[t.toSide].x
                updatedTransition.y2 = svgPoint.y + Directions[t.toSide].y
            }
            return updatedTransition
        }))
    }

    const onDrop = (event) => {
        if (draggingTransition) {
            setDraggingTransition(null);    // relesed before was over an edge
        }

        if (!draggingId) return;

        // const parent = event.currentTarget.getBoundingClientRect();
        const svg = event.currentTarget;
        const pt = svg.createSVGPoint();

        pt.x = event.clientX;
        pt.y = event.clientY;

        const svgPoint = pt.matrixTransform(
            svg.getScreenCTM().inverse()
        );

        setModel(model =>
        ({
            ...model, states: model.states.map(s =>
                s.id === draggingId
                    ? {
                        ...s, left: svgPoint.x, top: svgPoint.y,
                    }
                    : s
            )

        })
        );

        setTransitions(transitions => transitions.map(t => {
            const updatedTransition = { ...t }
            if (t.sourceId == draggingId) {
                updatedTransition.x1 = svgPoint.x + Directions[t.fromSide].x
                updatedTransition.y1 = svgPoint.y + Directions[t.fromSide].y
            } else if (t.targetId == draggingId) {
                updatedTransition.x2 = svgPoint.x + Directions[t.toSide].x
                updatedTransition.y2 = svgPoint.y + Directions[t.toSide].y
            }
            return updatedTransition
        }))
        setDraggingId(null);
    }


    return (
        <div className='p-2 m-2'>
            <Row>
                <Col md='auto'></Col>
                <Col md='4' className="d-flex justify-content-between">
                    <button onClick={addState}>מצב חדש</button>
                    <button onClick={loadExample}>טעינת דוגמא</button>
                    <button onClick={() => console.log(model, transitions)}>דוגמא בלוג</button>
                </Col>
                <Col>
                    <p></p>
                </Col>
            </Row>

            <svg
                className="automaton-container"
                ref={containerRef}
                onPointerMove={onDragOver}
                onPointerUp={onDrop}>
                <defs>
                    <marker
                        id="arrow"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,6 L9,3 z" fill="black" />
                    </marker>
                </defs>
                {model.states.filter(s => s.type == 'state').map(q => <State key={q.id} state={q} onDragStart={onDragStart} onAddTransition={onStartTransition} onEndTransition={onEndTransition} draggingTransition={draggingTransition} setDraggingTransition={setDraggingTransition} />)}

                {transitions.map(t => (
                    <Transition key={t.id} transition={t} editTransition={editTransition} getDomPoint={getDomPoint} />
                ))}
                {draggingTransition && (
                    <path
                        d={`
                            M ${draggingTransition.x1} ${draggingTransition.y1}
                            Q ${(draggingTransition.x1 + draggingTransition.x2) / 2} ${draggingTransition.y1 - 50}
                            ${draggingTransition.x2} ${draggingTransition.y2}
                        `}
                        stroke="gray"
                        fill="none"
                        strokeDasharray="5,5"
                    />
                )}
            </svg>
        </div>
    )
}



export default Automaton;
