<script>
  import axios from 'axios'

  import { mapState } from 'vuex'

  export default {
    emits: ['link-clicked'],
    data() {
      return {
        result: [],
        category: 'all',
        name: 'all',
        searchText: '',
        notFound: false
      }
    },

    methods: {
      handleClick() {
        this.searchText = ''
        this.$emit('link-clicked')
      },
      axiosGetPlants() {
        axios.get('/plants.json').then((response) => {
          this.result = response.data
        })
      },
      onClickPlants() {
        this.axiosGetPlants()

        //Errormeddelande om searchText inte matchar resultatet
        this.notFound = !this.result.some((plant) =>
          plant.name.toLowerCase().includes(this.searchText.toLowerCase())
        )
      }
    },

    computed: {
      ...mapState({
        loggedInUser: (state) => state.loggedInUser
      }),

      filterdPlants() {
        if (this.category === 'all') {
          return this.result.filter((plant) => {
            if (this.searchText) {
              const lowerCaseName = plant.name.toLowerCase()
              const lowerCaseCategory =
                typeof plant.category === 'string'
                  ? plant.category.toLowerCase()
                  : ''
              const lowerCaseSearchText = this.searchText.toLowerCase()
              return (
                lowerCaseName.includes(lowerCaseSearchText) ||
                lowerCaseCategory.includes(lowerCaseSearchText)
              )
            } else {
              return true
            }
          })
        } else {
          return this.result.filter(
            (plant) =>
              plant.category === this.category &&
              (plant.name
                .toLowerCase()
                .includes(this.searchText.toLowerCase()) ||
                (typeof plant.category === 'string' &&
                  plant.category
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())))
          )
        }
      }
    }
  }
</script>

<template>
  <div id="search-div">
    <input
      id="searchfield"
      @input="onClickPlants"
      type="text"
      v-model="searchText"
      placeholder="S??k v??xter..."
    />

    <div>
      <div v-if="searchText !== ''" id="linkdiv">
        <span @click="handleClick">
          <span v-if="notFound">
            <p>"{{ searchText }}" hittades inte.</p>
            <p>
              Men p??

              <RouterLink :to="`/profile/${loggedInUser.user}`"
                >f??nsterbr??dan</RouterLink
              >

              kan du l??gga till dina egna v??xter!
            </p>
          </span>
          <span v-else>
            <RouterLink
              v-for="plant in filterdPlants"
              :key="plant.name"
              :to="`/plants/${plant.name}`"
              class="list-group-item"
            >
              {{ plant.name }}

              <p>
                {{
                  Array.isArray(plant.category)
                    ? plant.category.join(',  ')
                    : plant.category
                }}
                <!-- {{ plant.category }} -->
              </p>
            </RouterLink>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  a:hover {
    color: inherit;
    font-weight: 600;
  }
  p {
    margin: 0;
  }
  input {
    width: 100%;
    padding: 10px;
    border-radius: 30px;
    border: none;
  }
  #linkdiv {
    display: block;
    height: 150px;
    overflow-x: scroll;
    position: absolute;
    background-color: rgba(225, 186, 107, 0.1);
    padding: 20px;
  }
  div {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    gap: 10px;
    width: 100%;
    justify-content: center;
  }
  li {
    cursor: pointer;
  }

  .links {
    list-style: none;
  }

  @media (min-width: 992px) {
    #search-div {
      display: flex;
      flex-direction: column;
    }
    #searchfield {
      width: 350px;
    }
    #linkdiv {
      background-color: rgba(225, 186, 107, 0.9);
    }
  }
</style>
