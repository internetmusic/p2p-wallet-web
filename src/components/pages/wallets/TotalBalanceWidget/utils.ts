import ReactHighcharts from 'react-highcharts';

import { rgba } from 'polished';

export const getConfig = (coin, currency, data, decimals, interval: number, start: number) => ({
  chart: {
    height: 67,
    type: 'area',
    spacing: [0, 0, 0, 0],
    data: {
      dateFormat: 'YYYY/mm/dd',
    },
  },
  title: {
    // eslint-disable-next-line unicorn/no-null
    text: null,
  },
  yAxis: {
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    gridLineColor: 'transparent',
  },
  xAxis: {
    visible: false,
    minPadding: 0,
    maxPadding: 0,
    type: 'datetime',
    gridLineColor: 'transparent',
  },
  plotOptions: {
    series: {
      pointStart: start,
      pointInterval: interval,
      animation: false,
    },
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, ReactHighcharts.Highcharts.Color('#C4C4C4').get('rgb')],
          [1, ReactHighcharts.Highcharts.Color('#C4C4C4').setOpacity(0).get('rgba')],
        ],
      },
      lineWidth: 1,
      color: rgba('#000', 0.1),
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      marker: {
        radius: 0,
      },
      // eslint-disable-next-line unicorn/no-null
      threshold: null,
      dataGrouping: { enabled: false },
    },
    line: {
      marker: {
        enabled: false,
      },
    },
  },
  tooltip: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 4,
    valueDecimals: 2,
    backgroundColor: '#C4C4C4',
    shadow: false,
    padding: 4,
    style: {
      color: 'white',
    },
    xDateFormat: '%b %d, %Y',
    useHTML: true,
    pointFormatter() {
      // return fiatToString({ value: this.y, decimals, unit: currency });
      return this.y;
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: 'Price',
      data,
    },
  ],
});
