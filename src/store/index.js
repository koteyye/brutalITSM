import {createStore} from 'vuex'

const state = {
    typeTrable: null,
    profile: null,
}

const mutations = {
    setTypeTrabl: (state, typeTrabl) => {
        state.typeTrabl = typeTrabl
    },
    setProfile: (state, info) => {
        state.profile = info
    }
}

const getters = {
    typeTrabl: state => {
        return state.typeTrabl
    },
    profile: state => {
        return state.profile
    }
}

const actions = {
    setSelectTypeTrabl: (state, typeTrable) => {
        let type = null
        state.commit('setTypeTrabl', typeTrable)
    },
    setUserProfile: (state, info) => {
        let user = null
        state.commit('setProfile', info)
    }
}

export const store = createStore({
    state,
    mutations,
    getters,
    actions
})