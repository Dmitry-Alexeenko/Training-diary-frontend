import {createSelector} from 'reselect'
import _ from 'lodash';

export const cardData = (cardList, cardName) => {
    return createSelector(
        state => state.mainReducer.cards,
        cards => {
            let cardItems = cards[cardList];
            if (cardItems !== {} && cardItems) {
                cardItems = cardItems.filter(item => item.idCard === cardName)
            }
            if (cardItems) {
                return cardItems[0]
            }
            return cardItems
        }
    );
};

export const boardItem = (boardId) => {
    return createSelector(
        state => state.mainReducer.boards,
        boards => {

            let boardItem = boards.filter(i => i.id === boardId);

            if (boardItem.length > 0) {
                return boardItem[0].name
            }
            return ''
        }
    );
};

export const cardElement = (cardList, cardName) => {
    return createSelector(
        state => state.mainReducer.cards,
        cards => {
            let cardItem = {};

            if(cards[cardList]) {
                cardItem = _.find(cards[cardList], {idCard: cardName})
            }
            return cardItem
        }
    );
};