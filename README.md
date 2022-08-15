# vue-ros-demo
Simple Demonstration of Vue + ROS Integration

## Demonstration
<p align="center">
    <img src="docs/demo.gif" width="800">
    </br>
    <sup>Demonstration (As seen in Chrome)</sup>
</p>

## Dependencies
* Vue 3
* ROS: *It should be compatible with ROS 1 and 2. Please open an issue if not.*

## Prerequisite
Make sure to run the following commands in the terminal
```console
roslaunch rosbridge_server rosbridge_websocket.launch
rostopic pub /listener std_msgs/String "Hello, World"
rosrun rospy_tutorials add_two_ints_server
```

## Installation
```console
npm install
```

### Run (for development)
```console
npm run serve
```

### Linting
```console
npm run lint
```

### Compile (for production)
```console
npm run build
```
