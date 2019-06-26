import React,{Component} from 'react';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button } from 'antd';

import RichTextEditor from './rich-text-editor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {reqCategory} from '../../../api'
import './index.less'

const Item = Form.Item;

class SaveUpdate extends Component{
  state = {
    options: [],
  };

  async componentDidMount() {
    const result = await reqCategory('0');    // 初始化级联列表数据
    this.setState({
      options: result.map((item) => {
        return {
          value: item._id,
          label: item.name,
          isLeaf: false
        }
      })
    })
  }
/*{
  value: 'jiangsu',
  label: 'Jiangsu',
  isLeaf: false,
},*/

  loadData = async selectedOptions => {
    // console.log(selectedOptions)
    // selectedOptions是当前点击的数组里的对象,[]包裹形式返回,就是对象本身
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 显示加载图标
    targetOption.loading = true;

    const result = await reqCategory(targetOption.value);
    if(result) {
      // 将loading改为false
      targetOption.loading = false;

      targetOption.children = result.map((item) => {    // children属性就是二级级联列表数据
        return {
          label: item.name,
          value: item._id,
        }
      });
    }
    this.setState({
      options: [...this.state.options],
    });
  };
  
  render() {
    const {getFieldDecorator} = this.props.form;

    const { options } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    };
    return <div>
      <Card
        title={
        <div className="card">
          <Icon type="arrow-left" className="arrow-icon" /> &nbsp;添加商品
        </div>
      }
        style={{ width: '100%' }}>
        <Form {...formItemLayout}>
          <Item label="商品名称:">
            {
              getFieldDecorator(
                'name',{
                  rules: [
                    { required: true, message: 'Please 填!'}
                  ]
                }
              )(<Input placeholder="请输入商品名称"/>)
            }

          </Item>
          <Item label="商品描述:">
            <Input placeholder="请输入商品描述"/>
          </Item>
          <Item label="选择分类:" wrapperCol={{span: 8}}>
            <Cascader
              options={options}
              loadData={this.loadData}  // 点击请求级联列表第二层数据
              changeOnSelect
            />
          </Item>
          <Item label="商品价格:">
            <InputNumber
              className="price-input"
              defaultValue={''}
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/￥\s?|(,*)/g, '')}
            />
          </Item>
          <Item wrapperCol={{span: 20}}>
            <RichTextEditor />
          </Item>
          <Item>
            <Button type="primary" className="add-product-button" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    </div>
  }
}

export default Form.create()(SaveUpdate)