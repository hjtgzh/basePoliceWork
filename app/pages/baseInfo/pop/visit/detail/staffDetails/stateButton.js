import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,Input
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const stateButton = Form.create()(React.createClass({
  getInitialState: function() {
    return {
      show: false,
    };
  },
  change(){
  	this.props.setBtnArr(this.props.name,!this.props.show);
    this.setState({
      show: !this.state.show
    })
  },

  render() {
    return (
        <Button style={{width:"100%",marginBottom:5}} type={this.props.show ? "primary" : "ghost"} size="large" onClick={this.change}>{this.props.children}</Button>
    );
  },
}));

export default stateButton;
