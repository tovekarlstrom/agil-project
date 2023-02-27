import { createStore } from 'vuex'
// import vuexPersist from './vuexPersist'
import vuexLocal from './vuexPersist'

const state = {
  users: {
    klarab: {
      name: 'Klara',
      password: 'klarab',
      favorites: []
    },
    sannaa: {
      name: 'Sanna',
      password: 'sannaa',
      favorites: []
    },
    ellinors: {
      name: 'Ellinor',
      password: 'ellinors',
      favorites: []
    },
    tovek: {
      name: 'Tove',
      password: 'tovek',
      favorites: []
    },
    isabelll: {
      name: 'Isabell',
      password: 'isabelll',
      favorites: []
    }
  },

  loggedInUser: '',
  searchText: ''
}

// const plugins = [vuexLocal]
// const plugins = [vuexPersist.plugin]

const mutations = {
  RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  // SET_USERS(state, users) {
  //   state.users = { ...users }
  // },
  logutUser(state) {
    state.loggedInUser = ''
  },
  setSearchText(state, searchText) {
    state.searchText = searchText
  },
  addLoggedInUser(state, loggedUser) {
    state.loggedInUser = {
      user: loggedUser,
      name: state.users[loggedUser].name
    }
  },
  addUser(state, newUser) {
    state.users[newUser.user] = {
      name: newUser.name,
      password: newUser.password,
      favorites: []
    }
  },
  addPlant(state, newPlant) {
    state.users[newPlant.user].favorites.push(newPlant.addplant)
  },
  removePlant(state, deletePlant) {
    state.users[deletePlant.user].favorites.splice(deletePlant.index, 1)
  }
}
const plugins = [vuexLocal.plugin]

// const actions = {
//   toggleMenu({ commit }) {
//     console.log('Test från store action')
//     commit('toggleMenu')
//   }
// }

// createStore.Store({
//   modules: {
//     userObjects: usersModules
//   },
//   plugins: [
//     new VuexPersist({
//       modules: {
//         userObjects: {
//           path: ['users']
//         }
//       }
//     })
//   ]
// })

export default createStore({ mutations, state, plugins, strict: true })
