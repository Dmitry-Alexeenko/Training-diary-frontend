import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from '../../../../styles/CardItems.module.scss';
import {deleteCardItem} from "../../../../redux/thunkCreators/mainTC";

const CardItems = (props) => {
    let location = useLocation();
    const cardsItems = useSelector(state => state.mainReducer.cards[props.idList]);
    const dispatch = useDispatch();

    let deleteCard = (idList, idCard) => {
        dispatch(deleteCardItem(idList, idCard))
    };

    let cardsItem = cardsItems.map((i, index) =>
        (<div key={index} className={styles.cardItem}>

            <NavLink to={{pathname: `/c/${props.idList}/${i.idCard}`, state: {background: location}}}>

                <div className={styles.cardItemText}>
                    {i.name && i.name.length < 24
                        ? i.name
                        : i.name.substring(0, 24) + "..."}
                </div>

                {i.message && <div>...</div>}
            </NavLink>

            <span className={styles.cardItem__btn} onClick={()=> {deleteCard(props.idList, i.idCard)}}>x</span>
        </div>)
    );

    return (
        <div className={styles.cardItem__container}>
            {cardsItem}
        </div>
    )
};


export default CardItems