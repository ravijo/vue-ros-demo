import { createApp } from 'vue'
import App from './App.vue'
import ROSLIB from 'roslib'

const app = createApp(App)

// Connect to our rosbridge WebSocket server and make ros available to this Vue instance.
// Register it as a global property that can be accessed on any component instance inside the application.
app.config.globalProperties.ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
})

app.mount('#app')
