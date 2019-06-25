import React,{Component} from 'react';
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item;

const Option = Select.Option;

class AddCategoryForm extends Component{
  static propTypes = {
    category: PropTypes.array.isRequired
  };

  validator(rule, value, callback) {
    if(!value) return callback('请输入分类名称');
    const result = this.props.category.find((item) => {return item.name === value});
    if(result) {
      callback('该名称已存在')
    }else {
      callback()
    }
  }

  render() {
    const {category} = this.props;
    const {getFieldDecorator} = this.props.form;

    return <Form>
      <Item label="所属分类">
        {
          getFieldDecorator(
            'parentId',{          // 验证的这个名字要和请求的参数匹配
              initialValue: '0'   // 下拉框初始化选中的
            }
          )(
            <Select style={{ width: '100%' }} onChange={this.handleChange}>
              <Option value="0">一级分类</Option>
              {
                category.map((item) => {
                  return <Option value={item._id} key={item._id}>{item.name}</Option>
                })
              }
            </Select>
          )
        }
      </Item>

      <Item label="分类名称">
        {
          getFieldDecorator(
            'categoryName',{
              rule: [{
                validator: this.validator
              }]
            }
          )(
            <Input placeholder="请输入分类名称"/>
          )
        }
      </Item>
    </Form>
  }
}

export default Form.create()(AddCategoryForm);