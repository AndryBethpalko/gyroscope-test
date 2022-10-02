import logo from './logo.svg';
import React from 'react';
import './App.css';


export default class GyroscopeTest extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true,
      x: 0,
      y: 0,
      z: 0
    }
    let gyroscopeApi = {};
    // new window.DeviceMotionEvent(devicemotion);
    // gyroscopeApi.addEventListener(
    //   'activate',
    //   this.handleGyroscopeActivateEvent.bind(this)
    // );
    // gyroscopeApi.addEventListener(
    //   'reading',
    //   this.handleGyroscopeReadingEvent.bind(this)
    // );
    this._GyroscopeTestData = {
      gyroscopeApi: gyroscopeApi
    };
  }

  get gyroscopeApi() {
    return this._GyroscopeTestData.gyroscopeApi;
  }

  componentDidMount() {
    // this.gyroscopeApi.start();
    window.addEventListener('deviceorientation', this.handleGyroscopeReadingEvent.bind(this));
    // setInterval(
    //  this.handleGyroscopeReadingEvent.bind(this),
    //   1000
    // )
  }

  handleGyroscopeActivateEvent(event) {
    console.log('handleGyroscopeActivateEvent %o', event);
    this.active = true;
  }

  handleGyroscopeReadingEvent(event) {
    console.log('handleGyroscopeReadingEvent %o', event);
    console.log('handleGyroscopeReadingEvent %o', this.gyroscopeApi);
    this.alpha = event.alpha;
    this.beta = event.beta;
    this.gamma = event.gamma;
  }

  set active(value) {
    this.setState(
      {active: value}
    );
  }

  get active() {
    return this.state.active;
  }

  set alpha(value) {
    this.setState(
      {x: value}
    )
  }

  set beta(value) {
    this.setState(
      {y: value}
    )
  }

  set gamma(value) {
    this.setState(
      {z: value}
    )
  }

  get alpha() {
    return this.state.x;
  }

  get beta() {
    return this.state.y;
  }

  get gamma() {
    return this.state.z;
  }

  render() {
    return (
      <div>
        {
          this.active ?
            (
              <>
                x = {this.alpha} <br/>
                y = {this.beta} <br/>
                z = {this.gamma} <br/>
              </>
            ) : 'Activating gyroscope .... '
        }
        <div className='sphere-envelope'><Sphere Zangle={this.alpha} Xangle={this.beta}/></div>
      </div>
    );
  }
}


class Sphere extends React.Component {
  render() {
    const Y_Angle = this.props.Zangle || 0;
    const X_Angle = 90 - (this.props.Xangle || 0);
    let meridians = [];
    for (let i = 0; i < 180; i += 20) {
      let alpha = (i + Y_Angle) % 360;
      let beta = (i + X_Angle) % 360;
      if (!i || alpha < 180) {
        meridians.push(
          <div className={`longitude${i ? '' : ' flatness'}`} key={`${i}_longitude`}
               style={
                 {transform: `rotate3d(0, 1, 0, ${i}deg)`}
               }>
            <div>{i}</div>
          </div>
        );
      }
      if (!i || beta < 180) {
        meridians.push(
          <div className={`latitude`} key={`${i}_latitude`}
               style={
                 {transform: `rotate3d(1, 0, 0, ${i}deg)`}
               }>
          </div>
        );
      }
    }

    return <div className='sphere' style={{transform: `rotate3d(0, 1, 0, ${Y_Angle}deg)`}}>
      <div className='sphere'
           style={
             {transform: `rotate3d(1, 0, 0, ${X_Angle}deg)`}
           }>
        {meridians}
      </div>
    </div>
  }
}