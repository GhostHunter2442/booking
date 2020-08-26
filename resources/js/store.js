

export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: []
        },

    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload);
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(item => item.bookable.id !== payload);
        },
        setBasket(state, payload) {
            state.basket = payload;
        },

    },
    actions: {
        setLastesSearch(context, payload) {
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearchs', JSON.stringify(payload));
        },
        loadStoredState(context) {
            const lastSearch = localStorage.getItem('lastSearchs');
            if (lastSearch) {
                context.commit('setLastSearch', JSON.parse(lastSearch));
            }

            const basket = localStorage.getItem('baskets');
            if (basket) {
                context.commit('setBasket', JSON.parse(basket));
            }

        },
        addToBasket({ commit, state }, payload) {
            // context.state, context.commit
            commit('addToBasket', payload);
            localStorage.setItem('baskets', JSON.stringify(state.basket));
        },
        removeFromBasket({ commit, state }, payload) {
            commit('removeFromBasket', payload);
            localStorage.setItem('baskets', JSON.stringify(state.basket));
        },
        clearBasket({commit,state},payload){
            commit("setBasket",{items:[]});
            localStorage.setItem("baskets",JSON.stringify(state.basket))
        }


    },
    getters: {
        itemsInBasket: (state) => state.basket.items.length,
        inBasketAlready(state) {
            return function (id) {
                return state.basket.items.reduce(
                    (result, item) => result || item.bookable.id === id,
                    false
                );
            }
        }
    }
};
