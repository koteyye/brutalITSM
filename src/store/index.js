import {createStore} from 'vuex'

const state = {
    typeTrable: null
}

const mutations = {
    setTypeTrabl: (state, typeTrabl) => {
        state.typeTrabl = typeTrabl
    }
}

const getters = {
    typeTrabl: state => {
        return state.typeTrabl
    }
}

const actions = {
    setSelectTypeTrabl: (state, typeTrable) => {
        let type = null
        state.commit('setTypeTrabl', typeTrable)
    }
}

export const store = createStore({
    state,
    mutations,
    getters,
    actions
})