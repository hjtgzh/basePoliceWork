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

const stateButton = React.createClass({
  getInitialState: function() {
    return {
      show:false,
    };
  },
  componentDidMount() {
  },
  change(value){
    this.props.setBtnArr({
      value:this.props.name,
      grade:this.props.grade,
      show:!this.props.show
    })
  },

  render() {
    // console.warn('render stateButton')
    return (
      <Button type={this.props.show ? "primary" : "ghost"} onClick={this.change}>{this.props.children}</Button>      
    );
  },
});

export default stateButton;
