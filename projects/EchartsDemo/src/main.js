import echarts from 'echarts';
import {bar} from './js/bar';

var myChart = echarts.init(document.getElementById('root'));
myChart.setOption(bar);
