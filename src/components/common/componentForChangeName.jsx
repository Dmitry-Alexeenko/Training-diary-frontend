import React, {useState} from 'react';
import styles from '../../styles/ComponentForChangeName.module.scss';

function ComponentForChangeName(props) {
    let {nameElement } = props;
    let {updateElement, saveElement} = props;
    const [editMode, setEditMode] = useState(false);

    const saveContentElement = () => {
        setEditMode(false);
        saveElement()
    };

    return (
        <div className={styles.titleContainer}>
            {!editMode &&
            <h3 onClick={() => { setEditMode(true)}} className={styles.title}>
                {nameElement}
            </h3>
            }
            {editMode &&
            <input type={'text'}
                   value={nameElement}
                   autoFocus={true}
                   onBlur={saveContentElement}
                   onChange={(e) => {
                       updateElement(e.target.value)
                   }}
                   className={styles.input}
            />
            }
        </div>
    );
}

export default ComponentForChangeName
