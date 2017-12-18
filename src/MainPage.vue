<template>
  <div class="page">
    <Navbar></Navbar>
    <div class="content">
      <b-tabs pills class="main-page-tabs">
        <b-tab title="Recent" :title-item-class="['main-page-tab']" :title-link-class="['main-page-tab-link']" active>
          <br>
            <Day v-for="day in days" :key="day.date"
              :date= "day.date"
              :dayExists= "day.dayExists"
              :dayType= "day.dayType"
              :activeLevel= "day.activeLevel"
              :treatment= "day.treatment"
              :notes= "day.notes"
              :settings="settings"
              @addDay="addDay($event)"
            ></Day>
        </b-tab>
        <b-tab title="Trends" :title-item-class="['main-page-tab']" :title-link-class="['main-page-tab-link']">
          <br>
          <p>There's no content here at the moment. Try checking back later</p>
        </b-tab>
      </b-tabs>
      <div class="print-button">
        <span><i class="fa fa-lg fa-print" aria-hidden="true"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Day from './components/Day'
import EventBus from './eventBus'

export default {
  name: 'MainPage',
  components: {
    Navbar, Day, EventBus
  },
  mounted () {
    EventBus.$on('setAppSettings', function (payLoad) {
    })
    EventBus.$on('changeAppSettings', function (payLoad) {
    })
    EventBus.$on('toggleTreatmentStatus', function (name) {
      console.log('Toggle Treatment Status called in the Main Page')
      console.log(name)
      for (var setting in this.settings) {
        console.log(this.settings[setting].name)
        if (this.settings[setting].name === name) {
          console.log('found a match in the data. Updating...')
          this.settings[setting].status = !this.settings[setting].status
        }
      }
    })
  },

  data () {
    return {
      days: [
        {
          date: '2017-11-24',
          dayExists: true,
          dayType: 'Good',
          activeLevel: 'Full',
          treatment: [ 'Sumatriptan', 'Topiramate' ],
          notes: ''
        },
        {
          date: '2017-11-23',
          dayExists: true,
          dayType: 'Good',
          activeLevel: 'Full',
          treatment: ['Sumatriptan', 'Running'],
          notes: ''
        },
        {
          date: '2017-11-22',
          dayExists: true,
          dayType: 'Good',
          activeLevel: 'Full',
          treatment: [ 'Sleeping', 'Lemon Tea' ],
          notes: ''
        },
        {
          date: '2017-11-21',
          dayExists: true,
          dayType: 'Okay',
          activeLevel: 'Half',
          treatment: [ 'Dark Room Rest' ],
          notes: ''
        },
        {
          date: '2017-11-20',
          dayExists: true,
          dayType: 'Mig',
          activeLevel: 'None',
          treatment: [ ],
          notes: ''
        },
        {
          date: '2017-11-19',
          dayExists: false,
          dayType: null,
          activeLevel: null,
          treatment: [ ],
          notes: ''
        },
        {
          date: '2017-11-18',
          dayExists: false,
          dayType: null,
          activeLevel: null,
          treatment: [ ],
          notes: ''
        },
        {
          date: '2017-11-17',
          dayExists: false,
          dayType: null,
          activeLevel: null,
          treatment: [ ],
          notes: ''
        }
      ],
      settings: [
        {
          name: 'Sumatriptan',
          customType: 'others',
          status: true
        },
        {
          name: 'Topiramate',
          customType: 'preventative',
          status: true
        },
        {
          name: 'Dark Room Rest',
          customType: 'relief',
          status: true
        },
        {
          name: 'Lemon Tea',
          customType: 'relief',
          status: true
        },
        {
          name: 'Sleeping',
          customType: 'relief',
          status: false
        },
        {
          name: 'Running',
          customType: 'relief',
          status: false
        }
      ]
    }
  },
  methods: {
    addDay: function (newDay) {
      console.log('Add Day called in the Main Page')
      console.log(newDay)
      for (var day in this.days) {
        if (this.days[day].date === newDay.date) {
          console.log('found a match in the data. Updating...')
          this.days[day].dayExists = newDay.dayExists
          this.days[day].dayType = newDay.dayType
          this.days[day].activeLevel = newDay.activeLevel
          this.days[day].treatment = newDay.treatment
          this.days[day].notes = newDay.notes
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .page {
    color: #ffffff;
    background-color: #5d7297;
    min-height: 100vh;
    .content {
      padding-top: 70px;
      .main-page-tabs {
        width: 100%;
      }
      .main-page-tab {
        background: transparent;
        width: 40%;
        font-weight: bold;
        font-size: 20px;
        padding-top: 5px;

        .nav-link.main-page-tab-link {
          background-color: transparent;
          color: rgba($color: #ffffff, $alpha: 0.7);
          margin: 0px 20px;
          &.active {
            color: rgba($color: #ffffff, $alpha: 1);
            border-bottom: 2px solid #ffffff;
            border-radius: 0px;
          }
        }
      }
    }
    .print-button {
      background-color: rgb(0, 218, 218);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding-top: 8px;
      position: absolute;
      top: 80px;
      right: 15px;
    }
  }
  
</style>
