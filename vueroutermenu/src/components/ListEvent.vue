<template>

  <div id="all-events">
    <div v-if="events && events.length > 0">
      <div v-for="event in events" v-bind:key="event.id" style="width:auto;text-align:left">
        <div style="width:auto;text-align:left;margin-top: 20px;">
          <h3>{{event.name}}</h3>
          <p>{{event.category}}</p>
          <p>{{event.address}}</p>
          <p>{{event.date}} | {{event.time}}</p>
          <hr/>
        </div>

      </div>
      <div v-if="events && events.length === 0" class="ml-2" style="width:auto;text-align:left">
        <div class="alert alert-info">No Events Found.</div>
      </div>
      

    </div>


  </div>

</template>
<script>
  import axios from 'axios';

export default {
  name: 'ListEvent',
  data: function() {
    return{
      events: null
    }
    ;
  },
  async beforeRouteEnter(to, from, next){
    try{
      const res =  await axios.get('http://localhost:3001/events/',{
      });
      window.console.log('res', res);
      window.console.log('res.data', res.data);
      // save received events to an array
      const array = res.data;
      window.console.log('array', array);
      next(vm => {vm.events = array});
    }catch(err){
      window.console.log(err);
    }
  }

};
</script>
<style scoped>

</style>