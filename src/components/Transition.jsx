
import '../css/transition.css'

const Transition = ({ transition }) => {
    const onDragStart = (event) => {
        event.dataTransfer.setData('text/plain', transition.title);
    }
    return (
        <div
            className='transition-container'
            style={{ top: transition.top, left: transition.left }}
            draggable={true}
            onDragStart={onDragStart}>
            <div className='transition-text'>abc</div>
            <div className='transision-arrow'>
                <span>&#x25b6;</span>
                <div className='transision-line'></div>
            </div>
        </div>
    )
}

export default Transition;