<template>
    <div id="add-event">
        <form class="custom-form" @submit.prevent="onSubmit">

            <div class="form-group">
                <label for="name">Name</label><br>
                <input v-model="event.name" type="text" id="name" name="name" placeholder="name" required/>
            </div>

            <div class="form-group">
                <label for="category">Category</label><br>
                <input v-model="event.category" type="text" id="category" name="category" placeholder="Category" required/>
            </div>

            <div class="form-group">
                <label for="address">Address</label><br>
                <input v-model="event.address" type="text" id="address" name="category" placeholder="Address" required/>
            </div>

            <div class="form-group">
                <label for="date">Date</label><br>
                <input v-model="event.date" type="date" id="date" name="date" placeholder="Date" required/>
            </div>
            <div class="form-group">
                <label for="time">Time</label>
                <b-form-timepicker v-model="event.time" id="time" name="time" placeholder="Choose a time" size="sm" required></b-form-timepicker>
            </div>

            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-primary">Add Event</button>
            </div>

        </form>

        <!-- ALERT -->
        <div>
            <b-alert v-model="showDismissibleAlert" dismissible variant="danger" class="m-2">
                {{message}}
            </b-alert>
            <b-alert v-model="showDismissibleAlertSuccess" dismissible variant="success" class="m-2">
                {{message}}
            </b-alert>
        </div>

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
        message:'',
        dismissSecs: 3,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        showDismissibleAlertSuccess: false,
      }
        ;
      },
      methods:{
      onSubmit: async function(){
        const data ={
          id: this.event.id,
          name:this.event.name,
          category:this.event.category,
          address:this.event.address,
          date:this.event.date,
          time: this.event.time
        };
        await axios.post('http://localhost:3001/events/', data).then(function(res) {
          window.console.log('res.data',res.data);

        }).catch(function(err) {
          window.console.log('err',err);
        });
        this.message = 'Event Added Successfully!';
        this.showDismissibleAlert= false;
        this.showDismissibleAlertSuccess= true;
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



</style>