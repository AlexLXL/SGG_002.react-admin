import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component{
  state = {
    option: {}
  };

  componentDidMount() {
    this.setState({
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {  // 移入提示
          // formatter: "{a} <br/>{b} : {c}",  // 这个是自定义移入时显示的样式
        },

        series: [{
          name: '销量',
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
        }],

      }
    })
  }

  render() {
    return <ReactEcharts option={this.state.option} />
  }
}