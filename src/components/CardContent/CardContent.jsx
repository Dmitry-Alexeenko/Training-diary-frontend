import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/CardContent.module.scss';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {cardData} from "../../redux/selectors";
import {changeMessageCardItem, changeNameCardItem} from "../../redux/thunkCreators/mainTC";

function CardContent(props) {
    let history = useHistory();
    let {cardList, cardName} = useParams();
    const cardItem = useSelector(cardData(cardList, cardName));
    let message = '';
    let name = '';

    if (cardItem && cardItem !== {}) {
        message = cardItem.message;
        name = cardItem.name;
    }

    const dispatch = useDispatch();

    const [inputIsOpen, setInputIsOpen] = useState(false);
    const [inputIsOpenName, setInputIsOpenName] = useState(false);

    const [contentCardOriginal, setContentCardOriginal] = useState("");
    const [contentCard, setContentCard] = useState("");
    const [nameCard, setNameCard] = useState("");

    useEffect(() => {
        setContentCard(message);
        setContentCardOriginal(message);
        setNameCard(name)
    }, [message, name]);

    let back = (e) => {
        e.stopPropagation();
        history.goBack();
    };

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
        //onClick={back}
        <div className={styles.cardContent}>
            <div className={styles.cardContent__modal}>
                <div className={styles.cardContent__container}>


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
                    <h3>Описание</h3>
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

                    <button  onClick={back} >
                        закрыть
                    </button>

                </div>
            </div>
        </div>
    )
}

export default withAuthRedirect(CardContent)
