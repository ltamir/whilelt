
import '../css/state.css';

const State = ({ state, onDragOver, onDrop }) => {

    const onDragStart = (event) => {
        event.dataTransfer.setData('text/plain', state.title);
    }
    const onVertexDragOver = (event) => {
        event.preventDefault();
        const title = event.dataTransfer.getData('text/plain')
        console.log(title);
        
    }
    return (
        <div className='state'
            style={{ top: state.top, left: state.left }}
            draggable={true}
            onDragStart={onDragStart}
        // onDragOver={onDragOver}
        // onDrop={onDrop}
        >
            <div className='state-connector-container'>
                <span className='vertex-right' style={{visibility:'hidden'}} onDragOver={onVertexDragOver}>x</span>
                <p>{state.title}</p>
                <span className='vertex-left' style={{visibility:'hidden'}} onDragOver={onVertexDragOver}>x</span>
                {/* <div className='state-connector'>
                </div> */}
            </div>
        </div>
    )
}

export default State