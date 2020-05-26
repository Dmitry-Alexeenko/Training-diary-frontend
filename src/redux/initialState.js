export let initialState = {
    boards: [],
    listCards: [],
    cards: {},
    lastIdBoard: null,
    lastIdList: null,
    lastIdCard: null,
    cardItem: null,
    isAuth: false,
    initialized: false,
    profile: null,
};

let initialLocalState = {
    boards: [
        {name: 'Пара слов от создателя', id: 1},
        {name: 'пример доски', id: 0}
    ],
    listCards: {
        0: [{name: 'Пример списка', idList: '0-0',}],
        1: [{name: 'Что тут можно?', idList: '1-2',},
            {name: 'Кто написал приложение?', idList: '1-1',},
        ],
    },
    cards: {
        "1-2": [{
            name: 'Возможности', idCard: '4-card-1', message: "Это приложение является аналогом приложения trello. " +
                "Тут можно создавать новые доски, новые списки и новые карты. " +
                "Вести записи и их редактировать. Можно удалить и менять всё (доски, листы и карты)"
        },
            {
                name: 'Где хранятся данные',
                idCard: '3-card-2',
                message: "Так как это приложение работает без BackEnd, то все данные я решил сохранять в LocalStorage " +
                    "При обновлении страницы данные не теряются. И даже если Вы выключите и включите компьютер, данные " +
                    "будут на месте"
            },],
        "1-1": [{
            name: 'Меня зовут Дмитрий',
            idCard: '2-card-222',
            message: "Здравствуйте. Меня зовут Дмитрий. Я написал это приложение чисто по фану. Я занимался им когда было " +
                "свободное время, утром до работы, или во время обеда."
        },
            {
                name: 'GitHub',
                idCard: '1-card-3333',
                message: "Если вдруг вас заинтересовало как написано это приложение, вы можете пройти на мой GitHub " +
                    "просто скопировав ссылку https://github.com/Dmitry-Alexeenko Если Вам понабится мой номер телефона " +
                    "то вот он 89870013385. Можно написать в Telegram"
            },],
        "0-0": [],
    },
    lastIdBoard: 2,
    lastIdList: 3,
    lastIdCard: 5,
    cardItem: null,
    isAuth: false,
    initialized: false,
    profile: null,
};

if (!localStorage.state) {
    let state = JSON.stringify(initialLocalState);
    localStorage.setItem("state", state);
}

