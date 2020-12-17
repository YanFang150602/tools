import echarts from 'echarts';
import {bar} from './js/bar';

var myChart = echarts.init(document.getElementById('bar'), 'light');
myChart.setOption(bar);
