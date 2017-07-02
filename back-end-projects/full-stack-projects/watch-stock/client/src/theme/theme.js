/**
 * (c) 2010-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 *
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 *
 * Modified by Arshad Khan
 */

export default function setTheme(Highcharts) {

  Highcharts.theme = {
     colors: ['#7a3086', '#007b91', '#d92b4b',
              '#91c7a9', '#de8d47', '#008080',
              '#4040C0', '#46bcde', '#c5c454',
              '#d6d8de'],
     chart: {
        backgroundColor: null,
        style: {
           fontFamily: '\'Montserrat\', monospace',
           fontWeight: 'normal',
           fontStyle: 'normal',
           color: '#aaa'
        },
        height: 400
     },
     title: {
        style: {
           color: '#fefefe',
           fontSize: '18px',
           fontWeight: 'bold'
        }
     },
     subtitle: {
        style: {
          color: '#fefefe',
        }
     },
     xAxis: {
        gridLineColor: '#eee',
        labels: {
           style: {
              color: '#aaa'
           }
        },
        lineColor: '#444',
        minorGridLineColor: '#444',
        tickColor: '#444',
        tickWidth: 0,
        title: {
           style: {
              color: '#444'

           }
        }
     },
     yAxis: {
        gridLineColor: '#444',
        labels: {
           style: {
              color: '#aaa'
           }
        },
        lineColor: '#444',
        minorGridLineColor: '#444',
        tickColor: '#444',
        tickWidth: 0,
        title: {
           style: {
              color: '#444'
           }
        }
     },
     tooltip: {
       animation: true,
       valuePrefix: '$',
       valueSuffix: ' USD',
       backgroundColor: '#fefefe',
        useHTML: true,
        style: {
           color: '#242128'
        },
        borderRadius: '5',
        borderColor: '#aaa',
        borderWidth: 0,
        followTouchMove: true
     },
     plotOptions: {
        series: {
          animation: {
            duration: 500,
            easing: 'easeOutBounce'
          },
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#2b2833'
          },
          lineWidth: 0,
          states: {
            hover: {
              lineWidth: 1
            }
          },
        //  lineColor: 'rgba(0,0,0,0)'
        }
     },
     legend: {
        itemStyle: {
           color: '#eee'
        },
        itemHoverStyle: {
           color: '#FFF'
        },
        itemHiddenStyle: {
           color: '#606063'
        }
     },
     credits: {
        style: {
           color: 'rgba(0,0,0,0)'
        }
     },
     labels: {
        style: {
           color: '#707073'
        }
     },

     drilldown: {
        activeAxisLabelStyle: {
           color: '#F0F0F3'
        },
        activeDataLabelStyle: {
           color: '#F0F0F3'
        }
     },

     navigation: {
        buttonOptions: {
           symbolStroke: '#DDDDDD',
           theme: {
              fill: '#505053'
           }
        }
     },

     // scroll charts
     rangeSelector: {
        allButtonsEnabled: true,
        buttonSpacing: 7,
        buttonTheme: {
           fill: 'rgba(255,255,255,0.08)',
           stroke: '#eee',
           r: 2,
           style: {
              color: '#aaa'
           },
           states: {
              hover: {
                 fill: '#fefefe',
                 stroke: '#aaa',
                 style: {
                    color: '#2b2833'
                 }
              },
              select: {
                 fill: '#fefefe',
                 stroke: '#2b2833',
                 style: {
                    color: '#2b2833'
                 }
              }
           }
        },
        inputBoxBorderColor: '#666',
        inputBoxWidth: 120,
        inputBoxHeight: 18,
        inputStyle: {
           backgroundColor: '#2b2833',
           color: '#ccc',
           outline: 'rgba(0,0,0,0)',
           borderWidth: '2px'
        },
        labelStyle: {
           color: '#fefefe',
           fontWeight: 'bold'
        }
     },

     navigator: {
        enabled: false,
        handles: {
           backgroundColor: '#666',
           borderColor: '#444'
        },
        outlineColor: '#444',
        maskFill: 'rgba(255,255,255,0.08)',
        series: {
           color: '#777',
           lineColor: 'rgba(0,0,0,0)'
        },
        xAxis: {
           gridLineColor: '#444'
        }
     },


     scrollbar: {
        barBackgroundColor: 'rgba(255,255,255,0.08)',
        barBorderColor: '#444',
        buttonArrowColor: '#666',
        buttonBackgroundColor: 'rgba(255,255,255,0.08)',
        buttonBorderColor: '#444',
        rifleColor: '#666',
        trackBackgroundColor: '#2b2833',
        trackBorderColor: '#444'
     },

     legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
     background2: '#444',
     dataLabelsColor: '#aaa',
     textColor: '#aaa',
     contrastTextColor: '#red',
     maskColor: 'rgba(255,255,255,0.3)'
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);

}
