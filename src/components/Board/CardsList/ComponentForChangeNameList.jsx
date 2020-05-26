import React, {useState, useEffect} from 'react';
import styles from '../../../styles/ComponentForChangeName.module.scss';

function ComponentForChangeNameList(props) {
    let {nameElement, idList} = props;
    let {saveElement} = props;

    const [editMode, setEditMode] = useState(false);
    const [newNameElement, setNewNameElement] = useState(nameElement);

    useEffect(() => {
        setNewNameElement(nameElement)
    }, [nameElement, setNewNameElement]);

    const saveContentElement = () => {
        setEditMode(false);
        saveElement(newNameElement, idList)
    };

    return (
        <div className={styles.titleContainer}>
            {!editMode &&
            <h3 onClick={() => {
                setEditMode(true)
            }} className={styles.title}>
                {newNameElement}
            </h3>
            }
            {editMode &&
            <input type={'text'}
                   value={newNameElement}
                   autoFocus={true}
                   onBlur={saveContentElement}
                   onChange={(e) => {
                       setNewNameElement(e.target.value)
                   }}
                   className={styles.input}
            />
            }
        </div>
    );
}

export default ComponentForChangeNameList
