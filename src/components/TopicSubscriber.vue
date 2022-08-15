<template>
  <div>
    <h2> Topic Subscriber </h2>
    <p>ROS Topic Name:</p>
    <p>
      <input
      @keyup="initSubscriber"
      v-model.trim="topic"
      placeholder="Enter ROS Topic Here"
      />
    </p>
    <p> {{ status }}</p>
    <h3>Message Received</h3>
    <p> {{ message }}</p>
  </div>
</template>

<script>
import ROSLIB from 'roslib'

const allowedMessageType = 'std_msgs/String'

export default {
  name: 'TopicSubscriber',
  data () {
    return {
      topic: '',
      message: '',
      status: '',
      listener: null
    }
  },
  methods: {
    updateMessage (msg) {
      this.message = msg.data
    },
    unsubscribeListener (topic) {
      if (this.listener !== null) {
        this.listener.name = topic
        this.listener.unsubscribe(this.updateMessage)
      }
    },
    initSubscriber () {
      const that = this
      that.ros.getTopicType(that.topic, (type) => {
        if (allowedMessageType !== type) {
          that.status = `Unsupported ROS topic: ${that.topic}`
          that.unsubscribeListener(that.topic)
          return
        }

        // Create a listener when it is not initialized or a new topic is entered
        if (that.listener === null || that.listener.name !== that.topic) {
          that.unsubscribeListener(that.topic)

          // Like when publishing a topic, we first create a Topic object with details of the topic's name
          // and message type. Note that we can call publish or subscribe on the same topic object.
          that.listener = new ROSLIB.Topic({
            ros: that.ros,
            name: that.topic,
            messageType: type
          })

          // Then we add a callback to be called every time a message is published on this topic.
          that.listener.subscribe(that.updateMessage)
          that.status = `Listening to: ${that.topic}`
        }
      })
    }
  }
}
</script>
