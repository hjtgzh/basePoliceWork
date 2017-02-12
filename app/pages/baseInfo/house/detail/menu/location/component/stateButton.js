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
  change(){
  	this.props.setBtnArr({
      value:this.props.name,
      text:this.props.children,
      show:!this.props.show
    })
    this.setState({
      show: !this.state.show
    })
  },

  render() {
    return (
        <Button type={this.props.show? "primary" : "ghost"} size="large" onClick={this.change}>{this.props.children}</Button>      
    );
  },
});

export default stateButton;
