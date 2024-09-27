<script lang="ts">
export default {
  data() {
    return {
      showDropdown: false,
      dropdownOptions: ['1 days', '2 days', '3 days', '4 days', '5 days', '6 days', '7 days'],
      numberOfDaysSelected: this.$route.query.days_ahead === undefined ? 3 : this.$route.query.days_ahead
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectNumberOfDays(event: any) {
      const selectedOption = event.target.textContent;
      this.showDropdown = false;

      switch (selectedOption) {
        case '1 days':
          this.numberOfDaysSelected = 1;
          break;
        case '2 days':
          this.numberOfDaysSelected = 2;
          break;
        case '3 days':
          this.numberOfDaysSelected = 3;
          break;
        case '4 days':
          this.numberOfDaysSelected = 4;
          break;
        case '5 days':
          this.numberOfDaysSelected = 5;
          break;
        case '6 days':
          this.numberOfDaysSelected = 6;
          break;
        case '7 days':
          this.numberOfDaysSelected = 7;
          break;
        default:
          break;
      }
    },
    emitSearchEvent() {
        this.$emit("searchEvent", this.numberOfDaysSelected);
    }
  },
};

</script>

<template>
    <div class="content">
        <div class="day-selection-div">
            <div>
                <button @click="toggleDropdown">Number of days</button>
                <ul v-if="showDropdown" @click="selectNumberOfDays">
                    <li v-for="(option, index) in dropdownOptions" :key="index">
                        {{ option }}
                    </li>
                </ul>
            </div>
            <div>
                <p>Currently selected {{ numberOfDaysSelected }} days ahead</p>
            </div>
        </div>
        <div class="go-div">
            <button @click="emitSearchEvent()">Search</button>
        </div>
    </div>
</template>

<style scoped>
button {
    border: 0px;
    background-color: darkseagreen;
    color: black;
    padding: 8px;
}

.day-selection-div {
    display: flex;
    margin: 10px;
}

.day-selection-div div {
    margin-right: 10px;
}

.day-selection-div ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.day-selection-div li {
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
}

.day-selection-div li:hover {
  background-color: #f0f0f0;
  color: black;
}

.content {
    display: flex;
    flex-direction: column;
}

.go-div {
    margin: 10px;
}
</style>