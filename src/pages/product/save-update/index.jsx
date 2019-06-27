import React,{Component} from 'react';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button } from 'antd';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

import RichTextEditor from './rich-text-editor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { reqCategory, reqAddProduct } from '../../../api'
import './index.less'

const Item = Form.Item;

class SaveUpdate extends Component{
  state = {
    options: [],
  };

  richTextEditorRef = React.createRef();  // ref除了可以拿真是DOM对象，还可以拿组件的实例对象

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

  addProduct = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const { name, desc, price, categoriesId } = values;   // 应为要发请求，所以先把值拿了

        const {editorState} = this.richTextEditorRef.current.state;
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()))

        let pCategoryId = '0';
        let categoryId = '';

        if (categoriesId.length === 1) {
          categoryId = categoriesId[0];
        } else {
          pCategoryId = categoriesId[0];
          categoryId = categoriesId[1];
        }

        const result = reqAddProduct({ name, desc, price, pCategoryId, categoryId, detail });

        if(result) {
          this.props.history.push("/product/index")
        }
      }
    })
  };

  goBack = () => {
    this.props.history.push("/product/index");
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
          <Icon type="arrow-left" className="arrow-icon" onClick={this.goBack}/> &nbsp;添加商品
        </div>
      }
        style={{ width: '100%' }}>
        <Form {...formItemLayout} onSubmit={this.addProduct}>
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
            {
              getFieldDecorator(
                'desc',{
                  rules: [
                    { required: true, message: 'Please 填!'}
                  ]
                }
              )(<Input placeholder="请输入商品描述"/>)
            }
          </Item>
          <Item label="选择分类:" wrapperCol={{span: 8}}>
            {
              getFieldDecorator(
                'categoriesId',{
                  rules: [
                    { required: true, message: 'Please 填!'}
                  ]
                }
              )(
                <Cascader
                  options={options}
                  loadData={this.loadData}  // 点击请求级联列表第二层数据
                  changeOnSelect
                />
              )
            }
          </Item>
          <Item label="商品价格:">
            {
              getFieldDecorator(
                'price',{
                  rules: [
                    { required: true, message: 'Please 填!'}
                  ]
                }
              )(
                <InputNumber
                  className="price-input"
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
              )
            }

          </Item>
          <Item wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.richTextEditorRef}/>
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