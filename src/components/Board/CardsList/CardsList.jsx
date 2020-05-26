import React, {useState} from 'react';
import styles from '../../../styles/CardList.module.scss';
import SelectBtn from "../../selectBtn/SelectBtn";
import CardItems from "./CardItem/CardItems";
import ComponentForChangeNameList from "./ComponentForChangeNameList";
import {useDispatch, useSelector} from "react-redux";
import {changeNameListItem} from "../../../redux/thunkCreators/mainTC";

const CardsList = (props) => {
    let {listCards, boardId} = props;
    let {deleteList, addCardItem, setNameNewList, saveNewList, nameNewList} = props;

    const cards = useSelector(state => state.mainReducer.cards);
    let dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    let updateNameList = (newName, idList) => {
        dispatch(changeNameListItem({newName, idList, boardId}))
    };

    let cardsList = listCards.map((i, index) =>
        (<div key={index} className={styles.list}>
            <ComponentForChangeNameList nameElement={i.name} saveElement={updateNameList} idList={i.idList}/>
            <div className={styles.listContent}>
                <CardItems cards={cards[i.idList]} idList={i.idList}/>

                <SelectBtn quantityCards={cards[i.idList].length}
                           addCardItem={addCardItem}
                           boardId={boardId}
                           idList={i.idList}/>
            </div>
            <div onClick={() => {
                deleteList(i.idList)
            }} className={styles.list__btn}>
                <span>x</span>
            </div>
        </div>)
    );

    return (
        <div className={styles.board__list}>
            {cardsList}
            <div className={styles.list}>

                {!editMode &&
                <div>
                    {listCards.length === 0

                        ? <button onClick={() => {
                            setEditMode(true)
                        }} className={styles.board__btn}>
                            + Добавить список
                        </button>

                        : <button onClick={() => {
                            setEditMode(true)
                        }} className={styles.board__btn}>
                            + Добавить еще одну колонку
                        </button>
                    }
                </div>}

                {editMode &&
                <div>
                    <input type={'text'} autoFocus={true} onChange={(e) => {
                        setNameNewList(e.target.value)
                    }} className={styles.board__input}/>

                    <button onClick={() => {
                        saveNewList();
                        setNameNewList('');
                        setEditMode(false)
                    }} className={styles.btn__add}
                            disabled={nameNewList === ''}> Добавить список
                    </button>

                    <button onClick={() => {
                        setNameNewList('');
                        setEditMode(false)
                    }} className={styles.btn__delete}> X
                    </button>
                </div>}

            </div>
        </div>
    )
};

export default CardsList