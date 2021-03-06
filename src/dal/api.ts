import axios from 'axios'
import {CardsPackType, newCardPackType} from "../ui/settings/decks/decksType";
import {addCardType, CardsType} from "../ui/settings/cards/cardsType";

const instance = axios.create({
    // withCredentials: true,
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/",
    //baseURL: "https://dry-forest-56016.herokuapp.com/",
});

export const changeToken = (newToken: string) => {
    localStorage.removeItem('auth-token');
    localStorage.setItem('auth-token', newToken);
};

export const authApi = {

    login(email: string, password: string, rememberMe: boolean) {
        return instance.post("auth/login", {email, password, rememberMe})
            .then(response => {
                changeToken(response.data.token);
                return response.data
            })
    },

    forgotPass(email: string, html1: string, html2: string) {
        return instance.post('auth/forgot', {email, html1, html2})
            .then(res => {
                return console.log(res)
            })

    },

    register(email: string, password: string) {
        return instance.post('auth/register', {email, password})
            .then(res => res)
    },

    authMe(authToken: string | null) {
        //debugger
        return instance.post('auth/me', {token: authToken})
            .then(response => {
                console.log(response.data);
                changeToken(response.data.token);
            })
            .catch((fal) => {
                return fal
            })
    },

    setNewPass(resetPasswordToken: string | undefined, password: string) {
        return instance.post('auth/set-new-password', {resetPasswordToken, password})
            .then(res => res)
    }
};

export const decksApi = {

    addDeck(cardsPack: newCardPackType, token: string | null) {
        return instance.post('cards/pack', {cardsPack, token})
            .then(response => {
                changeToken(response.data.token);
                return response.data
            })
    },
    deleteDeck(id: string) {
        const token = localStorage.getItem('auth-token');
        return instance.delete(`cards/pack?token=${token}&id=${id}`)
            .then(response => {
                console.log(response);
                changeToken(response.data.token);
                return response
            })

    },
    getDeck(token: string | null, name: string, minValue: number, maxValue: number) {
        return instance.get(`cards/pack?token=${token}`
            // + (minValue && maxValue && `&min=${minValue}&max=${maxValue}`
            //     + name && `&packName=${name}`)
            )
            .then(response => {
                console.log(response.data);
                changeToken(response.data.token);
                return response.data
            })
    },
    updateDeck(deck: CardsPackType) {
        const token = localStorage.getItem('auth-token');
        return instance.put('cards/pack', {cardsPack: deck, token})
            .then(response => {
                changeToken(response.data.token);
                return response.data.updatedCardsPack
            })
    }

};

export const cardsApi = {

    addCard(card: addCardType) {
        return instance.post('cards/card', card)
            .then(response => {
                /*  localStorage.removeItem('auth-token');
                  localStorage.setItem('auth-token', response.data.token);*/
                changeToken(response.data.token);
                return response.data
            })

    },

    deleteCard(id: string) {
        const token = localStorage.getItem('auth-token');
        return instance.delete(`cards/card?token=${token}&id=${id}`)
            .then(response => {
                changeToken(response.data.token);
                return response.data
            })
    },

    getCards(id:string) {
        const token = localStorage.getItem('auth-token');
        console.log(id);
        return instance.get(`cards/card?cardsPack_id=${id}&token=${token}`
            // + (minValue && maxValue && `&min=${minValue}&max=${maxValue}`
            //     + name && `&cardName=${name}`)
        )
            .then(response => {
                changeToken(response.data.token);

                localStorage.removeItem('cardsPack_id');
                localStorage.setItem('cardsPack_id', id);
                return response.data
            })
    },

    updateCard(card: CardsType) {
        const token = localStorage.getItem('auth-token');
        return instance.put('cards/card', {card, token})
            .then(response => {
                changeToken(response.data.token);
                return response.data.updatedCard
            })
    }

};

export const filesApi = {

    getFile() {
        return instance.get('/file', {responseType: 'blob'})
            .then(({data}) => {

                const blob = new Blob([data], {type: 'image/jpeg'});
                console.log(blob);

                return data
            })
    },

    postFile(file: string) {
        return instance.post('/file', {myFile: file})
            .then(response => {
                return response.data
            })
    }
};

