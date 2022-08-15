<template>
  <div>
    <img class="logo" alt="Vue logo" src="./assets/vue-logo.png">
    <img class="logo" alt="ROS logo" src="./assets/ros-logo.png">
  </div>

  <div>
    <h1>Vue ROS Demo</h1>
    <p>Run the following commands in the terminal then refresh this page.</p>
    <ol class="center-list">
      <li>roslaunch rosbridge_server rosbridge_websocket.launch</li>
      <li>rostopic pub /listener std_msgs/String "Hello, World"</li>
      <li>rosrun rospy_tutorials add_two_ints_server</li>
    </ol>
  </div>

  <div class="row">
    <div class="block"><TopicSubscriber /></div>
    <div class="block"><ServiceClient /></div>
  </div>

  <hr/>
  <p> {{ message }} </p>
</template>

<script>
import TopicSubscriber from './components/TopicSubscriber.vue'
import ServiceClient from './components/ServiceClient.vue'

export default {
  name: 'App',
  data () {
    return {
      message: ''
    }
  },
  components: {
    TopicSubscriber,
    ServiceClient
  },
  mounted () {
    this.bindRosConCb()
  },
  methods: {
    bindRosConCb () {
      this.ros.on('connection', () => {
        this.message = 'Connected to websocket server'
      })
      this.ros.on('error', (error) => {
        this.message = `Error connecting to websocket server: ${error}`
      })
      this.ros.on('close', () => {
        this.message = 'Connection to websocket server closed'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}
input {
  margin: 0 5px;
}
.logo {
  margin: 0 10px;
  width: 10%;
}
.center-list {
  text-align: center;
  list-style-position: inside;
}
ol.center-list li {
  font-family: monospace;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.block {
  width: 400px;
}
hr {
  margin: 40px 0 0;
}
</style>
