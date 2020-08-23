export default {

        state: {
          lastSearch:{
              from:null,
              to:null
          }
        },
        mutations: {
            setLastSearch(state,payload){
                state.lastSearch = payload;
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

        }

};
