import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {changeMessageCardItem, changeNameCardItem, ShowCurrentCardItem} from "../../redux/thunkCreators/mainTC";
import {cardElement} from "../../redux/selectors";
import styles from "../../styles/CardContent.module.scss";


function CardView(props) {
    let {cardList, cardName} = useParams();

    let cardItem = useSelector(cardElement(cardList, cardName));

    const [inputIsOpen, setInputIsOpen] = useState(false);

    const [contentCardOriginal, setContentCardOriginal] = useState("");
    const [contentCard, setContentCard] = useState("");
    const [nameCard, setNameCard] = useState("");
    const [inputIsOpenName, setInputIsOpenName] = useState(false);

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(ShowCurrentCardItem(cardList))
    }, [dispatch, cardList]);

    useEffect(() => {
        setContentCard(cardItem.message);
        setContentCardOriginal(cardItem.message);
        setNameCard(cardItem.name)
    }, [cardItem.message, cardItem.name]);

    const saveContentCard = () => {
        dispatch(changeMessageCardItem({cardList, cardName, contentCard}));
        setInputIsOpen(false)
    };

    const savNewNameCard = () => {
        dispatch(changeNameCardItem({cardList, cardName, nameCard}));
        setInputIsOpenName(false)
    };

    if (!cardItem && cardItem !== {}) {
        return <div>Данная карта отсутствует</div>
    }
    return (
        <div className={styles.cardview__container}>

            {!inputIsOpenName &&
            <h3 onClick={() => {
                setInputIsOpenName(true)
            }} className={styles.cardContent__title}>
                Карта: {nameCard}
            </h3>
            }
            {inputIsOpenName &&
            <input type={'text'}
                   value={nameCard}
                   autoFocus={true}
                   onBlur={savNewNameCard}
                   onChange={(e) => {
                       setNameCard(e.target.value)
                   }}
            />
            }
            <div>
                <h3>Описание</h3>
            </div>
            <button onClick={() => {
                setInputIsOpen(true)
            }}
                    className={!inputIsOpen
                        ? styles.cardContent__btnRedaction
                        : styles.cardContent__btnRedactionDisabled}
                    disabled={inputIsOpen}>

                Редактировать
            </button>
            {!inputIsOpen &&
            <div className={styles.cardContent__description}>


                <div className={styles.description__title} onClick={() => {
                    setInputIsOpen(true)
                }}>

                    {cardItem.message
                        ? <p>{cardItem.message}</p>
                        : <p>Добавить более подробное описание</p>
                    }

                </div>

            </div>
            }

            {inputIsOpen &&
            <div className={styles.cardContent__textContainer}>

                        <textarea className={styles.cardContent__text}
                                  autoFocus={true}
                                  onChange={(e) => {
                                      setContentCard(e.target.value)
                                  }}
                                  value={contentCard}
                        />

                <button onClick={saveContentCard} className={styles.cardContent__btnSave}>
                    Сохранить
                </button>

                <button
                    onClick={() => {
                        setContentCard(contentCardOriginal);
                        setInputIsOpen(false)
                    }}
                    className={styles.cardContent__btnUndo}>
                    X
                </button>

            </div>
            }
        </div>
    )
}

export default CardView
