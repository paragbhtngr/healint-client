<template>
  <tr>
    <td class="setting-row">
      <div class="switch">
        <input type="checkbox" :id="name" :checked="status" @click="toggleStatus">
        <label :for="name"></label>
      </div>
    </td>
    <td class="name-column">{{name}}</td>
    <td>
      <select class="relief-select" @change="changeCustomType($event)">
        <option disabled value="">Please select one</option>
        <option v-for="o in customTypeOptions" :key="o.value" :value="o.value" :selected="o.value === customType">{{o.text}}</option>
      </select>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SettingRow',
  props: {
    name: {
      type: String
    },
    customType: {
      type: String,
      default: 'others'
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      customTypeOptions: [
        { text: 'Preventative', value: 'preventative' },
        { text: 'Relief', value: 'relief' },
        { text: 'Rescue Med', value: 'rescue' },
        { text: 'Others', value: 'others' }
      ]
    }
  },
  methods: {
    toggleStatus: function () {
      console.log('toggling status of ' + this.name + ' from ' + this.status + ' to ' + !this.status)
      this.$emit('toggleStatus', this.name)
    },

    changeCustomType: function (e) {
      console.log('setting customType value of ' + this.name + ' to ' + e.target.value)
      this.$emit('changeCustomType', {name: this.name, value: e.target.value})
    }
  }
}
</script>

<style lang="scss" scoped>
  tr {
    border-top: 1px solid #5d7297;
    width: 100%;
  }
  td {
    text-align: left;
  }
  .switch {
    display: block;
    margin: 10px 20px;
  
    input[type="checkbox"] {
      display: none;
      &:checked + label {
        background-color: #00dddd; 
      }
      &:checked + label:after {
        left: 23px;
      }
    }
  
    label {
      transition: all 200ms ease-in-out;
      display: inline-block;
      position: relative;
      height: 24px;
      width: 46px;
      border-radius: 40px;
      cursor: pointer;
      background-color: #000000;
      margin-bottom: 0px;
      color: transparent;
      &:after {
        transition: all 200ms ease-in-out;
        content: ' ';
        position: absolute;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background-color: white;
        top: 0px;
        left: 0px;
        right: auto;
        box-shadow: 1px 1px 1px gray;
      }
    }
  }
  select, .select {
    background: #ffffff;
    padding: 5px;
    margin-right: 10px;
    width: 125px;
  }
  .name-column {
    padding-right: 15px;
  }
</style>
