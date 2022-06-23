import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import Utils from '../../Utils';
import _ from "underscore"
import moment from 'moment';


export default function LineChart(props) {
    let { config, data } = props;
    const { xy_value, data_template, x_axis_settings, y_axis_settings} = config;
    const {x_axis, format} = x_axis_settings;
    const {y_axis,  is_percent, is_currency} = y_axis_settings;

    const colors  =  [
        "#3DD598",
        "#0062FF",
        "red",
        "yellow"

    ]

    if(data_template && Utils[data_template]) {
        data =  Utils[data_template](data, x_axis, y_axis, xy_value)
    }

    data.sort((a,b) => new Date(a[x_axis]) - new Date(b[x_axis]) );

    let uniqXyValue = [];
    let uniqXvalue = [];
     _.map(data, rec => {
         if(!uniqXyValue.includes(rec[xy_value])) {
            uniqXyValue.push(rec[xy_value])
         }
         if(!uniqXvalue.includes(rec[x_axis])) {
            uniqXvalue.push(rec[x_axis])
         }
     })
     let valueSet = []
     _.map(uniqXyValue, (xyValue, index)=> {
         let values = []
         _.map(uniqXvalue, xValue => {
             let i = _.findIndex(data, rec =>  rec[xy_value]== xyValue && rec[x_axis] == xValue)
             if(i != -1) {
                values.push(data[i][y_axis])
             }
         })
        valueSet.push({
            label: xyValue,
            data: values,
            backgroundColor: colors[index],
            borderColor: colors[index],
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 1
        })

     })


    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
      
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
            tooltipEl.style.borderRadius = '3px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = 1;
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transform = 'translate(-50%, -100%)';
            tooltipEl.style.transition = 'all .1s ease';
            const table = document.createElement('table');
            table.style.margin = '0px';
            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }
      
        return tooltipEl;
    };
      
    const externalTooltipHandler = (context) => {
        // Tooltip Element
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);
      
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map(b => b.lines);
        
            const tableHead = document.createElement('thead');
            const tableBody = document.createElement('tbody');
    
            bodyLines.forEach((body, i) => {
                const colors = tooltip.labelColors[i];
          
                const span = document.createElement('span');
                span.style.background = colors.backgroundColor;
                span.style.borderColor = colors.borderColor;
                span.style.borderWidth = '2px';
                span.style.marginRight = '5px';
                span.style.height = '10px';
                span.style.width = '10px';
                span.style.display = 'inline-block';
                const tr = document.createElement('tr');
                tr.style.backgroundColor = 'inherit';
                tr.style.borderWidth = 0;
                 
              
                const th = document.createElement('th');
                th.style.borderWidth = 0;
                th.style.textAlign = "left";

                let formattedValue = ""
                if(is_currency) {
                    formattedValue =  is_currency+ Utils.nFormatter(tooltip.dataPoints[i].raw,1)
                } else if(is_percent) {
                    formattedValue =  tooltip.dataPoints[i].formattedValue + "%"
                } else {
                    formattedValue =  Utils.nFormatter(tooltip.dataPoints[i].raw,1)
                }
              
                const text = document.createTextNode(formattedValue);
          
                th.appendChild(span);
                 // tooltipEl.style.backgroundColor =  colors.backgroundColor;
                th.appendChild(text);
                tr.appendChild(th);
                tableHead.appendChild(tr);
              });
        
            titleLines.forEach(_title => {
                let title = _title
                const tr = document.createElement('tr');
                tr.style.borderWidth = 0;
            
                const td = document.createElement('td');
                td.style.borderWidth = 0;
                td.style.textAlign = "left";
                if(format) {
                    title = moment(title).format(format)
                }
                const text = document.createTextNode(title);
    
            
                td.appendChild(text);
                tr.appendChild(td);
    
                tableBody.appendChild(tr);
            });
        
            const tableRoot = tooltipEl.querySelector('table');
    
            // Remove old children
            while (tableRoot.firstChild) {
              tableRoot.firstChild.remove();
            }
        
            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
          }
          const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    
          // Display, position, and set styles for font
            tooltipEl.style.opacity = 0.9;
            tooltipEl.style.backgroundColor = "white";
            tooltipEl.style.boxShadow = "0px 0px 5px 0px lightGrey";
            tooltipEl.style.color = "black";
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            tooltipEl.style.font = tooltip.options.bodyFont.string;
            tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
            tooltipEl.style.width="100px"
    };

    let annotationLine = {
        id: "annotationLine",
        beforeDraw:  chart => {
            if(chart.tooltip._active &&  chart.tooltip._active.length) {
                const ctx = chart.ctx
                ctx.save()
                const activePoint = chart.tooltip._active[0]
                ctx.beginPath()
                ctx.moveTo(chart.tooltip._active[0].element.x, chart.chartArea.top)
                ctx.lineTo(chart.tooltip._active[0].element.x, chart.chartArea.bottom)
                ctx.lineWidth = 1;
                ctx.strokeStyle = chart.tooltip._active[0].element.options.backgroundColor;
                ctx.stroke();
                ctx.restore()
            }
        }
    }

    const dataConfig = {
        labels: uniqXvalue,
        datasets: valueSet
    };
    let options = {
        plugins: {
          legend: {
            position:"bottom",
            labels: {
               usePointStyle: true,
               boxWidth: 6
              }
          },
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler
          }
        },
        scales: {
            y:{
               // beginAtZero: true,
                grid:{
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    callback: (value, index) => {
                        let formattedV = Utils.nFormatter(value,1)
                        if(is_currency) {
                            return `${is_currency}${formattedV}`
                        } else if(is_percent) {
                            return `${value}%`
                        } else {
                            return formattedV
                        }
                    }
                }
            },
            x:{
                grid:{
                    drawBorder: false
                },
                ticks: {
                    callback: (value, index, values) => {
                        let formattedV
                        if(x_axis_settings && x_axis_settings.format) {
                            formattedV = moment(uniqXvalue[index]).format(format)
                        } else {
                            formattedV = uniqXvalue[index]
                        }
                        return formattedV
                    }
                }
            }
        }
    }

    return (
        
        <div>
        {/* <div> */}
        <Line data={dataConfig} options={options} plugins={[annotationLine]} height={250}/>
        {/* </div> */}
        <div className='last-updated'>Last Updated: {moment(new Date()).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
        </div>
    );
}
