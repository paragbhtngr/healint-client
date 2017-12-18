<template>
  <div>
  <div v-if="dayExists" class="day">
    <div class="face">
      <span v-if="dayType==='Good'" class="good"><i class="fa fa-4x fa-smile-o" aria-hidden="true"></i></span>
      <span v-if="dayType==='Okay'" class="okay"><i class="fa fa-4x fa-meh-o" aria-hidden="true"></i></span>
      <span v-if="dayType==='Mig'" class="bad"><i class="fa fa-4x fa-frown-o" aria-hidden="true"></i></span>
    </div>
    <div class="info">
      <h6 class="info-date">{{date | moment("dddd, MMMM D")}}</h6>
      <span v-if="activeLevel==='Full'" class="good-pill"> No Activities Affected </span>
      <span v-if="activeLevel==='Half'" class="okay-pill"> Slowed Down </span>
      <span v-if="activeLevel==='None'" class="bad-pill"> Missed Activities </span>
      <br>
      <div class="treatments">
        <span v-for="t in treatment" :key="t" class="remedy">
          {{t}}
        </span>
      </div>
    </div>
  </div>
  <div 
    v-else class="day empty "
    v-bind:class="{editing: isEditing}"
    >
    <div class="empty-text">
      <span><i class="fa fa-question-circle" aria-hidden="true"></i></span>
      <p @click="toggleEditing">How was your {{date | moment("dddd, MMMM D")}}?</p>
    </div>
    <div class="editing-text">
      <h6 @click="toggleEditing">How was your {{date | moment("dddd, MMMM D")}}?</h6>
      <div class="daytype-faces">
        <span 
          @click="setDayType( 'Good' )"
          :class="{collapsed: showCollapse, active: (newDayType === 'Good')}"
          aria-controls="collapse4"
          :aria-expanded="showCollapse ? 'true' : 'false'"
          class="good">
          <i class="fa fa-3x fa-smile-o" :class="{hidden: (newDayType !== 'Good')}" aria-hidden="true"></i>
          <i class="fa fa-3x fa-circle" :class="{hidden: (newDayType === 'Good')}" aria-hidden="true"></i>
          <h6>GOOD</h6>
        </span>
        <span 
          @click="setDayType( 'Okay' )"
          :class="{collapsed: showCollapse, active: (newDayType === 'Okay')}"
          aria-controls="collapse4"
          :aria-expanded="showCollapse ? 'true' : 'false'"
          class="okay">
          <i class="fa fa-3x fa-meh-o" :class="{hidden: (newDayType !== 'Okay')}" aria-hidden="true"></i>
          <i class="fa fa-3x fa-circle" :class="{hidden: (newDayType === 'Okay')}" aria-hidden="true"></i>
          <h6>OKAY</h6>
        </span>
        <span 
          @click="setDayType( 'Bad' )"
          :class="{collapsed: showCollapse, active: (newDayType === 'Bad')}"
          aria-controls="collapse4"
          :aria-expanded="showCollapse ? 'true' : 'false'"
          class="bad">
          <i class="fa fa-3x fa-frown-o" :class="{hidden: (newDayType !== 'Bad')}" aria-hidden="true"></i>
          <i class="fa fa-3x fa-circle" :class="{hidden: (newDayType === 'Bad')}" aria-hidden="true"></i>
          <h6>BAD</h6>
        </span>
      </div>
      <b-collapse id="collapse" v-model="showCollapse" class="mt-2">
        <h6 @click="toggleEditing">Were your activities affected?</h6>
        <div class="daytype-faces">
          <span 
            @click="setActiveLevel( 'Full' )"
            :class="{collapsed: showCollapse, active: (newActiveLevel === 'Full')}"
            class="good">
            <i class="fa fa-3x fa-battery-full" aria-hidden="true"></i>
            <h6>NO</h6>
          </span>
          <span 
            @click="setActiveLevel( 'Half' )"
            :class="{collapsed: showCollapse, active: (newActiveLevel === 'Half')}"
            class="okay">
            <i class="fa fa-3x fa-battery-half" aria-hidden="true"></i>
            <h6>SLOWED</h6>
            <h6>DOWN</h6>
          </span>
          <span 
            @click="setActiveLevel( 'None' )"
            :class="{collapsed: showCollapse, active: (newActiveLevel === 'None')}"
            class="bad">
            <i class="fa fa-3x fa-battery-empty" aria-hidden="true"></i>
            <h6>MISSED</h6>
            <h6>ACTIVITIES</h6>
          </span>
        </div>
        <h6 @click="toggleEditing">Treatment(s) Used</h6>
        <div class="treatments">
          <span 
            v-for="remedy in settings" :key="remedy.name"
            v-if="remedy.status === true"
            class="remedy"
            @click="addNewTreatment(remedy.name)"
            :class="{active: treatments.includes(remedy.name)}"
          >
            {{remedy.name}}
          </span>
          <span 
            v-for="remedy in settings" :key="remedy.name"
            v-if="remedy.status === false && showAll"
            class="remedy"
            @click="addNewTreatment(remedy.name)"
            :class="{active: treatments.includes(remedy.name)}"
          >
            {{remedy.name}}
          </span>

        </div>
        <a class="showAll" :class="{hidden: showAll}" @click="toggleShowAll">Show All...</a>

        <h6 class="notes-header">Notes</h6>
        <input type="text" class="notes" v-model="notes" placeholder="Your notes...">
        <button class="edit-submit" @click="addNewDay"><i class="fa fa-star" aria-hidden="true"></i> Done!</button>
      </b-collapse>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    date: {
      type: String
    },
    dayExists: {
      type: Boolean,
      default: false
    },
    dayType: {
      type: String,
      default: null
    },
    activeLevel: {
      type: String,
      default: null
    },
    treatment: {
      type: Array,
      default: []
    },
    notes: {
      type: String,
      default: ''
    },
    settings: {
      type: Array,
      default: []
    }
  },
  data: () => {
    return {
      isEditing: false,
      showCollapse: false,
      newDayType: null,
      newActiveLevel: null,
      treatments: [],
      showAll: false
    }
  },
  methods: {
    toggleEditing: function () {
      this.isEditing = !this.isEditing
      this.$nextTick()
    },

    setDayType: function (dayType) {
      this.showCollapse = true
      this.newDayType = dayType
      this.$nextTick()
    },

    setActiveLevel: function (activeLevel) {
      this.newActiveLevel = activeLevel
      this.$nextTick()
    },

    toggleShowAll: function () {
      this.showAll = true
    },

    addNewTreatment: function (treatment) {
      this.treatments.push(treatment)
      this.$nextTick()
    },

    addNewDay: function () {
      let newDay = {
        date: this.date,
        dayExists: true,
        dayType: this.newDayType,
        activeLevel: this.newActiveLevel,
        treatment: this.treatments,
        notes: this.notes
      }
      console.log(newDay)
      this.$emit('addDay', newDay)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .day {
    background-color: #14142b;
    margin: 15px 15px;
    border-radius: 15px;
    padding: 10px 0px;
    display: flex;
    .face {
      padding: 20px;
      min-width: 100px;
      width: 30%;
      .good {
        color: #b0ffff;
      }
      .okay {
        color: #fffc5d;
      }
      .bad {
        color: #ffa500;
      }
    }
    .info {
      width: 70%;
      text-align: left;
      padding-top: 10px;
      font-weight: bold;
      .info-date {
        margin-bottom: 10px;
      }
      .good-pill {
        // background-color: hsla(180, 100%, 85%, 0.3);
        border: 2px solid #b0ffff;
        color: #b0ffff;
        padding: 3px 20px;
        border-radius: 40px;

      }
      .okay-pill {
        // background-color: rgba(255, 250, 93, 0.3);
        border: 2px solid #fffc5d;
        color: #fffc5d;
        padding: 3px 20px;
        border-radius: 40px;
      }
      .bad-pill {
        // background-color: rgba(255, 162, 0, 0.3);
        border: 2px solid #ffa500;
        color: #ffa500;
        padding: 3px 20px;
        border-radius: 40px;
      }
      .treatments {
        margin-top: 15px;
        .remedy {
          font-size: 14px;
          font-weight: normal;
          border: 1px solid #5d7297;
          background-color: #243553;
          color: #ffffff;
          padding: 3px 10px;
          margin-right: 10px;
          border-radius: 40px;
          margin-top: 20px;
          word-break: none;
          white-space: nowrap;
        }
      }
    }

    &.empty {
      .editing-text {
        display: none;
      }
      .empty-text {
        display: flex;
        span {
          padding-left: 20px;
          padding-right: 10px;
        }
        p {
          margin-bottom: 0px;
        }
      }
      background-color: rgba(20, 20, 43, 0.5);
      border-radius: 200px;
      &.editing {
          background-color: #14142b;
          border-radius: 15px;
          .empty-text {
            display: none;
          }
          .editing-text {
            display: block;
            margin: auto;
            padding-top: 10px;
            width: 90%;
            .daytype-faces {
              display: flex;
              width: 100%;
              justify-content: space-between;
              span {
                width: 30%;
              }
              .good {
                h6 {
                  margin-top: 5px;
                  color: #b0ffff;
                }
                color: #243553;
                &.active {
                  color: #b0ffff;
                }
              }
              .okay {
                h6 {
                  margin-top: 5px;
                  color: #fffc5d;
                }
                color: #243553;
                &.active {
                  color: #fffc5d;
                }
              }
              .bad {
                h6 {
                  margin-top: 5px;
                  color: #ffa500;
                }
                color: #243553;
                &.active {
                  color: #ffa500;
                }
              }
            }
            .treatments {
              margin-top: 15px;
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 15px;
              .remedy {
                font-size: 14px;
                font-weight: normal;
                border: 1px solid #5d7297;
                background-color: #243553;
                color: #ffffff;
                padding: 3px 10px;
                margin-right: 10px;
                border-radius: 40px;
                margin-top: 10px;
                word-break: none;
                white-space: nowrap;
                &.active {
                  background-color: #5d7297;
                }
              }
              
            }
            .notes-header {
              margin-top: 10px;
            }
            .notes {
              width: 100%;
              margin-bottom: 10px;
              padding: 10px 20px;
              border-radius: 7px;
            }
            .edit-submit {
              color: #ffffff;
              background-color:#5d7297;
              padding: 10px 15px;
              border-width: 0px;
              margin-top: 10px;
              margin-bottom: 10px;
              float: right;
              font-weight: bold;
            }
          }
          .showAll {
            color: #08e4e4;
          }
      }
    }
  }

  .hidden {
    display: none;
  }
</style>
