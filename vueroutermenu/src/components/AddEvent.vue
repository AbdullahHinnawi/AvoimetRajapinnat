<template>
    <div id="add-event">
        <form class="custom-form" @submit.prevent="onSubmit">

            <div class="form-group">
                <label for="name">Name</label><br>
                <input v-model="event.name" type="text" id="name" name="name" placeholder="name"
                       :class="{ 'has-error': submitted && invalidName }" autofocus @focus="clearStatus" @keypress="clearStatus"
                />
                <div v-if="submitted && invalidName" class="error-message">Event name is required</div>

            </div>

            <div class="form-group">
                <label for="category">Category</label><br>
                <input v-model="event.category" type="text" ref="anyName" id="category" name="category" placeholder="Category"
                       :class="{ 'has-error': submitted && invalidCategory }"
                />
                <div v-if="submitted && invalidCategory" class="error-message">Event category is required</div>
            </div>

            <div class="form-group">
                <label for="address">Address</label><br>
                <input v-model="event.address" type="text" ref="anyName" id="address" name="category" placeholder="Address"
                       :class="{ 'has-error': submitted && invalidAddress }"
                       />
                <div v-if="submitted && invalidAddress" class="error-message">Event address is required</div>
            </div>

            <div class="form-group">
                <label for="date">Date</label><br>
                <input v-model="event.date" type="date" ref="anyName" id="date" name="date" placeholder="Date"
                       :class="{ 'has-error': submitted && invalidDate }"
                />
                <div v-if="submitted && invalidDate" class="error-message">Event date is required</div>
            </div>
            <div class="form-group">
                <label for="time">Time</label>
                <b-form-timepicker v-model="event.time" ref="anyName" id="time" name="time" placeholder="Choose a time" size="sm"
                                   :class="{ 'has-error': submitted && invalidTime }"
                ></b-form-timepicker>
                <div v-if="submitted && invalidTime" class="error-message">Event time is required</div>
            </div>

            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Add Event</button>
            </div>

            <p v-if="error && submitted" class="error-message" :max="dismissSecs" @dismissed="dismissCountDown=0" dismissible style="font-size: 20px">
                ❗Please fill out all required fields
            </p>
            <p v-if="success" class="success-message" :max="dismissSecs" @dismissed="dismissCountDown=0" dismissible style="font-size: 20px">✅ Event successfully added</p>

        </form>

    </div>

</template>
<script>
   import axios from 'axios';

    export default {
      name: 'AddEvent',
      data: function() {
      return{
        event:{
          id: '',
          name:'',
          category:'',
          address:'',
          date:'',
          time:''
        },
        submitted:false,
        error: false,
        success: false,
        dismissSecs: 5,
        dismissCountDown: 0
      }
        ;
      },
      computed: {
        invalidName() {
          return this.event.name ===""
        },
        invalidCategory() {
          return this.event.category ===""
        },
        invalidAddress() {
          return this.event.address ===""
        },
        invalidDate() {
          return this.event.date ===""
        },
        invalidTime() {
          return this.event.time ===""
        }

      },
      methods:{
      onSubmit: async function() {
        this.submitted = true;
        window.console.log("Submitted", this.submitted);
        this.clearStatus();


        if (this.invalidName || this.invalidCategory || this.invalidAddress || this.invalidDate || this.invalidTime) {
          this.error = true;
          window.console.log("Error", this.error);
          return;
        }

          const data = {
            id: this.event.id,
            name: this.event.name,
            category: this.event.category,
            address: this.event.address,
            date: this.event.date,
            time: this.event.time
          };
          // clear input values
          this.event = {
            name: '',
            category: '',
            address: '',
            date: '',
            time: ''
          };

          await axios.post('http://localhost:3001/events/', data).then(function(res) {
            window.console.log('res.data', res.data);
          }).catch(function(err) {
            window.console.log('err', err);
          });
          this.error= false;
          this.success= true;
          this.submitted= false;
        },
        clearStatus() {
          this.success = false;
          this.error = false;
        }


      }
};
</script>
<style scoped>
    .form-group, b-form-timepicker {
        text-align: left;
        margin-top: 20px;
        width: 400px;
}

    input, b-form-timepicker {
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 2px 7px;
        width: 400px;

    }
    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color: #d33c40;
        font-size: 14px;
    }

    .success-message {
        color: #32a95d;
    }



</style>