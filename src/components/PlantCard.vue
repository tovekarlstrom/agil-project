<script>
  import { mapState } from 'vuex'
  // import InlogModal from './InlogModal.vue'
  import LogIn from './LogIn.vue'

  export default {
    components: {
      // InlogModal
      LogIn
    },
    props: {
      plant: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        showModal: false,
        Addedplant: false,
        NotLoggedIn: false,
        AlreadyAddedplant: false,
        showDescription: false,
        modal: false
      }
    },
    computed: {
      ...mapState({
        loggedInUser: (state) => state.loggedInUser,
        userFavorites: (state) => {
          if (state.loggedInUser) {
            return state.users[state.loggedInUser.user]?.favorites || []
          } else {
            return []
          }
        }
      })
    },
    methods: {
      addPlant() {
        if (this.loggedInUser !== '') {
          if (
            this.userFavorites.find((plant) => plant.name === this.plant.name)
          ) {
            this.AlreadyAddedplant = true
            setTimeout(() => {
              this.AlreadyAddedplant = false
            }, 3000)
          } else {
            this.$store.commit('addPlant', {
              user: this.loggedInUser.user,
              addplant: this.plant
            })
            this.Addedplant = true
            setTimeout(() => {
              this.Addedplant = false
            }, 3000)
          }
        } else {
          // this.NotLoggedIn = true
          this.modal = true
        }
      },
      onClick() {
        this.NotLoggedIn = false
      },
      closeModal() {
        this.NotLoggedIn = false
      }
    }
  }
</script>

<template>
  <div class="plant-box">
    <RouterLink :to="`/plants/${plant.name}`" class="plant-container">
      <img alt="plant.name" :src="plant.image[0]" />
      <h2>{{ plant.name }}</h2>
    </RouterLink>
    <img
      class="icon-image"
      @mouseout="showDescription = false"
      @mouseover="showDescription = true"
      @click="addPlant"
      src="../../assets/icons 8/icons8-potted-plant-100.png"
      alt="potted-plant"
    />
    <p class="description" v-show="showDescription">St??ll p?? f??nsterbr??dan</p>
    <!-- <i @click="addPlant" class="bi bi-suit-heart-fill" /> -->
    <div class="popup-divs" v-show="Addedplant">
      <p class="paragraph added-paragraph">
        {{ plant.name }} ??r tillagd p?? din f??nsterbr??da!
      </p>
    </div>
    <div class="popup-divs" v-show="AlreadyAddedplant">
      <p class="paragraph added-paragraph">
        Du har redan lagt till {{ plant.name }} p?? din f??nsterbr??da!
      </p>
    </div>
    <div>
      <div id="login-div">
        <div id="inlog-modal-div">
          <b-modal hide-footer v-model="modal">
            <h1>Du m??ste logga in f??rst!</h1>

            <LogIn />
          </b-modal>
          <!-- <InlogModal @close="closeModal" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .plant-box {
    position: relative;
    width: 270px;
    height: 320px;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 10px;
    border-radius: 10px;
  }

  .plant-box:hover {
    transition: all 0.3s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.1);
    top: -1px;
  }
  .plant-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-top: 20px;
  }

  .icon-image {
    width: 25px;
    height: 25px;
    object-fit: contain;
    align-self: end;
    margin-right: 8px;
    cursor: pointer;
  }

  .description {
    position: absolute;
    top: 70%;
    left: 80%;
    padding: 10px;
    font-size: 0.6rem;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.1);
  }

  i {
    align-self: flex-end;
  }

  h2 {
    margin-top: 5px;
  }

  .popup-divs {
    width: 95%;
    height: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.776);
    border-radius: 10px;
    position: absolute;
    top: 5px;
    z-index: 1;
  }

  #login-div {
    padding: 40px;
    position: absolute;
    // object-fit: cover;
  }

  #inlog-modal-div {
    // position: absolute;
    object-fit: contain;
  }

  .added-paragraph {
    text-align: center;
    margin: auto;
    padding: 40px;
  }

  #button-secondary {
    padding: 0;
  }

  p {
    margin: 0;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    color: inherit;
  }
</style>
