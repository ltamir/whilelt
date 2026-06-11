import { useState } from 'react';

const withEditor = (Component) => {
    return (props) => {
        const [title, setTitle] = useState("");
        const [editMode, setEditMode] = useState(false);

        const onStartEdit = () => {
            setEditMode(true)
        }
        const onCancelEdit = (value) => {
            setTitle(value)
            setEditMode(false)
        }

        const onSaveEdit = (cb, orig) => {
            cb({ ...orig, title })
            setEditMode(false)
        }
        
        return (
            <Component {...props}
                editMode={editMode}
                value={title}
                onChange={value => setTitle(value)}
                onStart={onStartEdit}
                onSave={onSaveEdit}
                onCancel={onCancelEdit} />
        )
    }

}

export default withEditor;