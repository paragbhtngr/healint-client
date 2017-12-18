<template>
  <div class="page">
    <Navbar></Navbar>
    <div class="content">
      <div class="feedback">
        <span><i class="fa fa-3x fa-comment-o" aria-hidden="true"></i></span>
        <div class="feedback-text">
          <h5>Have some feedback for us?</h5>
          <a href="#">Tap Here</a> to drop us a note!
        </div>
      </div>
      <div class="treatment-shortcuts">
        <span><i class="fa fa-caret-down" aria-hidden="true"></i></span> <p> Edit Your Treatment Shortcuts</p>
      </div>
      <div class="settings">
        <div class="settings-info">
          <span><i class="fa fa-question-circle" aria-hidden="true"></i></span> <p> To add a new treatment, use the "Medication" or "Relief" screens
          </p>
        </div>
        <table>
          <tr>
            <th></th>
            <th>Treatment</th>
            <th>Type</th>
          </tr>
          <SettingRow 
            v-for="row in settings" 
            v-if="row.name" 
            :key="row.name"
            :name= "row.name"
            :customType= "row.customType"
            :status= "row.status"
            @toggleStatus="toggleStatus($event)"
            @changeCustomType="changeCustomType($event)"
          ></SettingRow>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import EventBus from './eventBus'
import Navbar from './components/Navbar'
import SettingRow from './components/SettingRow'

export default {
  name: 'SettingsPage',
  components: {
    Navbar, SettingRow, EventBus
  },
  data () {
    return {
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
    setAppSettings: function () {
      // initialize app settings for the entire application
      let payload = ''
      EventBus.$emit('setAppSettings', payload)
    },
    changeAppSettings: function () {
      // set new preferences for a particular treatment across app
      let payload = ''
      EventBus.$emit('changeAppSettings', payload)
    },
    toggleStatus: function (name) {
      console.log('Toggle Status called in the Settings Page')
      console.log(name)
      for (var setting in this.settings) {
        if (this.settings[setting].name === name) {
          console.log('found a match in the data. Updating...')
          this.settings[setting].status = !this.settings[setting].status
          EventBus.$emit('toggleTreatmentStatus', name)
        }
      }
    },
    changeCustomType: function (e) {
      console.log('Change Custom Type called in the Settings Page')
      console.log(e.name)
      for (var setting in this.settings) {
        if (this.settings[setting].name === e.name) {
          console.log('found a match in the data. Updating...')
          this.settings[setting].customType = e.value
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .page {
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
    a {
      color: #08e4e4;
    }
    background-color: #5d7297;
    min-height: 100vh;
    .content {
      padding-top: 70px;
      .feedback  {
        margin: 15px;
        background-color: #243553;
        border-radius: 15px;
        padding: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .feedback-text {
          text-align: left;
          padding-left: 20px;
          h5 {
            margin-bottom: 0px;
          }
        }
      }
      .treatment-shortcuts {
        display: flex;
        margin-left: 15px;
        span {
          padding-right: 10px;
        }
      }
      .settings {
        .settings-info {
          background-color: #141414;
          border-radius: 15px 15px 0px 0px;
          display: flex;
          padding: 20px;
          text-align: left;
          span {
            padding-right: 10px;
          }
          p {
            margin-bottom: 0px;
          }
        }
        margin: 0px 15px;
        background-color: #243553;
        border-radius: 15px;
        
      }
    }
    table {
      width: 100%;
      th {
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
  }
</style>
