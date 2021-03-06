export const basepie = {
    series : [
        {
            name: '访问来源',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度
            data:[          // 数据数组，name 为数据项名称，value 为数据项值
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ],
            roseType: 'angle',  // 设置参数 roseType: 'angle' 把饼图显示成南丁格尔图
            itemStyle: {        // itemStyle 参数可以设置诸如阴影、透明度、颜色、边框颜色、边框宽度等
                normal: {
                    shadowBlur: 100,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

export const emphasis = {
    series : [
        {
            name: '访问来源',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            // 高亮样式。
            emphasis: {
                itemStyle: {
                    // 高亮时点的颜色
                    color: 'red'
                },
                label: {
                    show: true,
                    // 高亮时标签的文字
                    formatter: '高亮时显示的标签内容'
                }
            },
            data:[          // 数据数组，name 为数据项名称，value 为数据项值
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ]
        }
    ]
}

export const customcolor = {
    series : [
        {
            // 此系列自己的调色盘
            color: [,'#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            name: '访问来源',
            type: 'pie',    // 设置图表类型为饼图
            radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data:[          // 数据数组，name 为数据项名称，value 为数据项值
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ]
        }
    ]
}

export const tt = {
    baseOption: {
        title : {
            text: '南丁格尔玫瑰图',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'半径模式',
                type:'pie',
                roseType : 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                    {value:20, name:'rose5'},
                    {value:35, name:'rose6'},
                    {value:30, name:'rose7'},
                    {value:40, name:'rose8'}
                ]
            },
            {
                name:'面积模式',
                type:'pie',
                roseType : 'area',
                data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                    {value:20, name:'rose5'},
                    {value:35, name:'rose6'},
                    {value:30, name:'rose7'},
                    {value:40, name:'rose8'}
                ]
            }
        ]
    },
    media: [
        {
            option: {
                legend: {
                    right: 'center',
                    bottom: 0,
                    orient: 'horizontal'
                },
                series: [
                    {
                        radius: [20, '50%'],
                        center: ['25%', '50%']
                    },
                    {
                        radius: [30, '50%'],
                        center: ['75%', '50%']
                    }
                ]
            }
        },
        {
            query: {
                minAspectRatio: 1
            },
            option: {
                legend: {
                    right: 'center',
                    bottom: 0,
                    orient: 'horizontal'
                },
                series: [
                    {
                        radius: [20, '50%'],
                        center: ['25%', '50%']
                    },
                    {
                        radius: [30, '50%'],
                        center: ['75%', '50%']
                    }
                ]
            }
        },
        {
            query: {
                maxAspectRatio: 1
            },
            option: {
                legend: {
                    right: 'center',
                    bottom: 0,
                    orient: 'horizontal'
                },
                series: [
                    {
                        radius: [20, '50%'],
                        center: ['50%', '30%']
                    },
                    {
                        radius: [30, '50%'],
                        center: ['50%', '70%']
                    }
                ]
            }
        },
        {
            query: {
                maxWidth: 500
            },
            option: {
                legend: {
                    right: 10,
                    top: '15%',
                    orient: 'vertical'
                },
                series: [
                    {
                        radius: [20, '50%'],
                        center: ['50%', '30%']
                    },
                    {
                        radius: [30, '50%'],
                        center: ['50%', '75%']
                    }
                ]
            }
        }
    ]
}
