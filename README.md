# vue-ros-demo
Simple Demonstration of Vue + ROS Integration

## Demonstration
<p align="center">
    <img src="docs/demo.gif" alt="gif showing a demo">
    </br>
    <sup>Demonstration (As seen in Chrome)</sup>
</p>

## Dependencies
* Vue v3
* roslib v1.3.0
* ROS 
    * It should be compatible with ROS 1 and 2. Please open an issue if not.

## Prerequisite
Make sure to run the following commands in the terminal
### ROS1
```console
roslaunch rosbridge_server rosbridge_websocket.launch
rostopic pub /listener std_msgs/String "Hello, World"
rosrun rospy_tutorials add_two_ints_server
```

### ROS2
```bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
ros2 run demo_nodes_py add_two_ints_server
ros2 run demo_nodes_py talker
```
If you do not have `rosbridge_server` you need to install it with the following command
```bash
apt search rosbridge_suite
sudo apt install -y ros-<rosdistro>-rosbridge-suite # ros-humble-rosbridge-suite
```
After starting the `node` you can find the `topic/service` and its type with the following instructions.Then you need to modify the `allowedMessageType/serviceType` in file `TopicSubscriber.vue/ServiceClient.vue` to receive the message.
```console
$ ros2 service list
/add_two_ints
$ ros2 service type /add_two_ints
example_interfaces/srv/AddTwoInts
```
```console
$ ros2 topic list
/chatter
$ ros2 topic info /chatter
Type: std_msgs/msg/String
Publisher count: 1
Subscription count: 0
```

## Installation
```console
npm install
```
Incase of the folllowing error, please execute `npm install --force`
```console
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: vue-ros-demo@0.1.0
npm ERR! Found: eslint-plugin-vue@8.7.1
npm ERR! node_modules/eslint-plugin-vue
npm ERR!   dev eslint-plugin-vue@"^8.0.3" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer eslint-plugin-vue@"^7.0.0" from @vue/eslint-config-standard@6.1.0
npm ERR! node_modules/@vue/eslint-config-standard
npm ERR!   dev @vue/eslint-config-standard@"^6.1.0" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
npm ERR! See /home/ravi/.npm/eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/ravi/.npm/_logs/2022-08-15T10_52_32_924Z-debug-0.log
```

## Run (for development)
```console
npm run serve
```

## Linting
```console
npm run lint
```

## Compile (for production)
```console
npm run build
```

## Note
The project has been tested with the following npm packages:

```console
$ npm list
vue-ros-demo@0.1.0 /home/ravi/vue-ros-demo
├── @babel/core@7.18.10
├── @babel/eslint-parser@7.18.9
├── @vue/cli-plugin-babel@5.0.8
├── @vue/cli-plugin-eslint@5.0.8
├── @vue/cli-service@5.0.8
├── @vue/eslint-config-standard@6.1.0
├── core-js@3.24.1
├── eslint-plugin-import@2.26.0
├── eslint-plugin-node@11.1.0
├── eslint-plugin-promise@5.2.0
├── eslint-plugin-vue@8.7.1
├── eslint@7.32.0
├── roslib@1.3.0
└── vue@3.2.37
```

In case of having multiple PC (more specifically, rosbridge_server running on a remote machine), you must use the correct IP address. The localhost and 127.0.0.1 refer to the same device. So your node can not connect to rosbridge_server.

You can change the following ip addresses, in `main.js`
```js
app.config.globalProperties.ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090/'
})
```
reference: [https://github.com/ravijo/vue-ros-demo/issues/1](https://github.com/ravijo/vue-ros-demo/issues/1)
