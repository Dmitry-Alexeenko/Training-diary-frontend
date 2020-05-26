import React, {useState} from 'react';
import styles from '../../styles/SelectBtn.module.scss';

function SelectBtn(props) {
    let {addCardItem} = props;

    const [editMode, setEditMode] = useState(false);
    const [nameNewElement, setNameNewElement] = React.useState("");

    const activateEditMode = () => {
        setEditMode(true)
    };

    const deactivateEditMode = () => {
        setNameNewElement('');
        setEditMode(false)
    };

    const saveNewElement = () => {
        addCardItem(nameNewElement, props.idList);
        setNameNewElement('');
        setEditMode(false)
    };

    function changeNameElement(e) {
        setNameNewElement(e.target.value);
    }

    return (

        <div className={styles.btnContainer}>
            {!editMode &&
            <div>
                {props.quantityCards === 0
                    ? <button onClick={activateEditMode} className={styles.btn}>+ Добавить карточку</button>
                    : <button onClick={activateEditMode} className={styles.btn}>+ Добавить еще карточку</button>
                }

            </div>}
            {editMode &&
            <div>

                <input type={'text'} autoFocus={true} onChange={(e) => {
                    changeNameElement(e)
                }} className={styles.btnContainer__input}/>

                <div>
                    <button onClick={saveNewElement} className={styles.btn__add}
                            disabled={nameNewElement === ''}> +Добавить
                    </button>

                    <button onClick={deactivateEditMode} className={styles.btn__delete}> Отмена</button>
                </div>

            </div>}
        </div>
    );
}

export default SelectBtn;
