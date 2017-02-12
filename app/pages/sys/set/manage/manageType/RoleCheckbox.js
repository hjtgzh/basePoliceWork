import { Checkbox } from 'antd';
import React from 'react';

class RoleCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const cid = this.props.cid;
    this.props.onChecked(cid, e.target.checked);
  }

  render() {
    const checked = this.props.checked;
    const title = checked ? '已开通' : '未开通';
    return (
      <div className="table-checkbox">
        <Checkbox checked={checked} onChange={this.onChange}>{title}</Checkbox>
      </div>
    );
  }
}
module.exports = RoleCheckbox;
