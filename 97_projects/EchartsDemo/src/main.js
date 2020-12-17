import echarts from 'echarts';
import 'echarts/map/js/china';
import 'echarts/map/js/province/beijing';
import {bar, bards, grid} from './js/bar';
import { basepie, emphasis, customcolor, tt } from './js/pie';
import { china, beijing } from './js/map';

var myChart = echarts.init(document.getElementById('bar'), 'light');
myChart.setOption(grid);
myChart = echarts.init(document.getElementById('pie'), 'dark');
myChart.setOption(tt);
myChart = echarts.init(document.getElementById('map'));
myChart.setOption(beijing);
