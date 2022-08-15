<template>
  <div>
    <h2> Service Client </h2>
    <p>Input for AddTwoInts Service:</p>
    <p>
      <input
      type="number"
      v-model.number="paramA"
      placeholder="Enter Number 1 Here"
      />
      <input
      type="number"
      v-model.number="paramB"
      placeholder="Enter Number 2 Here"
      />
      <button @click="callService">Call Service</button>
    </p>
    <h3>Response Received</h3>
    <p> {{ message }}</p>
  </div>
</template>

<script>
import ROSLIB from 'roslib'

export default {
  name: 'ServiceClient',
  data () {
    return {
      serviceName: '',
      message: '',
      status: '',
      paramA: 0,
      paramB: 0,
      servieClient: null
    }
  },
  methods: {
    callService () {
      // First, we create a Service client with details of the service's name and service type.
      this.servieClient = new ROSLIB.Service({
        ros: this.ros,
        name: '/add_two_ints',
        serviceType: 'rospy_tutorials/AddTwoInts'
      })

      // Then we create a Service Request. The object we pass in to ROSLIB.ServiceRequest matches the
      // fields defined in the rospy_tutorials AddTwoInts.srv file.
      const request = new ROSLIB.ServiceRequest({
        a: this.paramA,
        b: this.paramB
      })

      // Finally, we call the /add_two_ints service and get back the results in the callback.
      // The result is a ROSLIB.ServiceResponse object.
      const that = this
      this.servieClient.callService(request, function (result) {
        that.message = result.sum
      })
    }
  }
}
</script>

<style scoped>
input {
  margin: 0 5px;
  width: 15%;
}
</style>
