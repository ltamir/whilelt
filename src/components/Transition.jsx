
import { useEffect, useState } from 'react';
import withEditor from './withEditor';
import '../css/transition.css'

const Transition = ({ transition, editTransition, editMode, value,  onChange, onStart, onSave, onCancel }) => {

    const onDragStart = (event) => {
        event.dataTransfer.setData('text/plain', transition.title);
    }

    useEffect( () => {
        onChange(transition.title)
    }, [])
    return (
        <div
            className='transition-container'
            style={{ top: transition.top, left: transition.left }}
            draggable={true}
            onDragStart={onDragStart}>
            <div
                className='transition-text'
            >
                {/* <Editor editMode={editMode} value={title} onChange={e => setTitle(e.target.value)} onStart={onStartEdit} onSave={onSaveEdit} onCancel={onCancelEdit} /> </div> */}
                <Editor editMode={editMode} value={value} onChange={onChange} onStart={onStart} onSave={() =>onSave(editTransition, transition)} onCancel={onCancel} /> </div>
            <div className='transision-arrow'>
                <span>&#x25b6;</span>
                <div className='transision-line'></div>
            </div>
        </div>
    )
}

const Editor = ({ editMode, value, onChange, onStart, onSave, onCancel }) => {

    if (editMode)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100px' }}>
                <input style={{}} type='text' value={value} onChange={e => onChange(e.target.value)} id="title" />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <span onClick={onSave} title='שמירה'>&#x2713;</span>
                    <span onClick={onCancel} title='ביטול'>&#x293A;</span>
                </div>
            </div>
        )
    return <div onClick={onStart}>{value}</div>
}

export default withEditor(Transition);