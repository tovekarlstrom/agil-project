<script>
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import { mapState } from 'vuex'

  export default {
    components: {
      FullCalendar
    },
    computed: {
      ...mapState({
        loggedInUser: (state) => state.loggedInUser,
        myEvents: (state) => {
          if (state.loggedInUser) {
            return state.users[state.loggedInUser.user]?.calendar || []
          } else {
            return []
          }
        }
      })
    },
    created() {
      this.calendarOptions.events = this.myEvents
      // for (let x = 0; x < this.myEvents.length; x++) {
      //   this.calendarOptions.events.push(this.myEvents[x])
      //   console.log('myEvent', this.myEvent)
      // }
    },
    watch: {
      myEvents(newVal) {
        Object.assign(this.calendarOptions, {
          events: newVal
        })
      }
    },
    data() {
      return {
        selectedEvent: null,
        titleInput: '',
        descriptionInput: '',
        selectedDate: null,
        showModal: false,
        showEvent: false,
        eventDescription: '',
        eventDate: '',
        eventTitle: '',
        eventIndex: '',
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          buttonText: {
            month: 'month'
          },

          events: [
            {
              title: 'My event',
              start: '2023-03-10',
              description: 'More information about my event.'
            }
          ],
          eventColor: '#ffffff',
          eventTextColor: 'black',
          eventClick: (info) => {
            this.eventDate = info.event.startStr
            this.eventDescription = info.event.extendedProps.description
            this.eventTitle = info.event.title
            this.showEvent = true
            this.selectedEvent = this.myEvents.find(
              (item) => item.title === info.event.title
            )
            this.eventIndex = this.myEvents.indexOf(this.selectedEvent)
            console.log('eventIndex', this.eventIndex)
            console.log('info.event', info.event.title)
            console.log('selectedEvent', this.selectedEvent)
            console.log('myEvents', this.myEvents)
            // this.selectedEvent = info.event
            // console.log('event', this.selectedEvent)
          },
          dateClick: (info) => {
            this.selectedDate = info.dateStr
            this.showModal = true
          }
        }
      }
    },
    methods: {
      closeModal() {
        this.showModal = false
      },
      closeEvent() {
        this.showEvent = false
      },
      addEvent() {
        const event = {
          title: this.titleInput,
          start: this.selectedDate,
          description: this.descriptionInput
        }
        console.log('date', this.selectedDate)
        this.$store.commit('addEventToUserCalendar', event)
        // this.calendarOptions.events.push(event)

        this.showModal = false
        this.descriptionInput = ''
        this.titleInput = ''
      },

      removeEvent(eventIndex) {
        console.log('index', eventIndex)

        this.$store.commit('removeEvent', {
          user: this.loggedInUser.user,
          index: eventIndex
        })
        this.showEvent = false
      }
    }
  }
</script>
<template>
  <div id="set-event" v-show="showModal">
    <div class="date-close-container">
      <p>{{ selectedDate }}</p>
      <i @click="closeModal" id="remove-icon" class="bi bi-x-lg" />
    </div>
    <input type="text" v-model="titleInput" placeholder="Namn på händelse" />
    <input type="text" v-model="descriptionInput" placeholder="Beskrivning" />
    <button @click="addEvent">submit</button>
  </div>
  <div id="showEventContainer" v-show="showEvent">
    <div class="date-close-container">
      <p>{{ eventDate }}</p>
      <i @click="closeEvent" class="bi bi-x-lg" />
    </div>
    <h3>{{ eventTitle }}</h3>
    <p>{{ eventDescription }}</p>
    <button @click="removeEvent(eventIndex)">Ta bort</button>
  </div>
  <FullCalendar :options="calendarOptions" />
</template>

<style>
  #showEventContainer {
    width: 300px;
    height: 200px;
    background-color: #f6f5f1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    top: 215px;
    overflow-x: hidden;
    overflow-y: auto;
    left: 10;
    z-index: 10;
  }

  .date-close-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 10px;
  }
  #set-event {
    width: 300px;
    height: 200px;
    background-color: #f6f5f1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    top: 215px;
    overflow-x: hidden;
    overflow-y: auto;
    left: 10;
    z-index: 10;
  }

  :root {
    --fc-border-color: #373030;
    --fc-neutral-text-color: #030000;
    --fc-button-bg-color: #2c3e50;
  }
  .fc-daygrid-day-number {
    color: black;
  }
  .fc-day-header {
    color: rgb(0, 0, 0);
  }
</style>