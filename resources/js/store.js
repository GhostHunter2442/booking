export default {

        state: {
          lastSearch:{
              from:null,
              to:null
          },
          basket:{
              items:[]
          }
        },
        mutations: {
            setLastSearch(state,payload){
                state.lastSearch = payload;
             },
             addToBasket(state,payload){
                  state.basket.items.push(payload);
             },
             removeFromBasket(state,payload){
                  state.basket.itmes=state.basket.items.filter(item =>item.boookable.id != payload);
             }

        },
        actions:{
            setLastesSearch(context,payload){
                context.commit('setLastSearch',payload);
                localStorage.setItem('lastSearch',JSON.stringify(payload));
            },
            loadStoredState(context){
                const lastSerrch = localStorage.getItem('lastSearch');
                 if(lastSerrch){
                     context.commit('setLastSearch',JSON.parse(lastSerrch));
                 }
            }

        },
        getters:{
            itemsInBasket:(state) => state.basket.items.length


        }

};
