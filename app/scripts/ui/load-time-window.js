import { ACTION_TYPES } from '../config';
import UIModel from './model';
import { domElementFromDescription } from './utils'
import * as d3 from 'd3';

export default class LoadTimeWindow extends UIModel {
  constructor (store) {
    super('load-time-window');
    this.store = store;

    store.subscribe(eventTypes => {
      if (eventTypes.includes(ACTION_TYPES.NEW_LOAD_DATA)) {
        this.chartSVG.update();
      }
    });  
  }

  renderChildren () {
    this.chartSVG = this.renderChart();
    return [
      domElementFromDescription({
        tag: 'h3',
        properties: { textContent: 'Average CPU Load Change Over the past 10 minutes' }
      }),
      this.chartSVG
    ];
  }

  renderChart () {
    const height = 500, width = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 30};
    const store = this.store;
    const data = store.getState().avarageLoad10MinWindow;
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.time))
      .range([margin.left, width - margin.right]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);
    const xAxis = (g, x) => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .text('Time →');
    const yAxis = (g, y) => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('Avarage Load ↑'));
    const svg = d3.create('svg')
      .attr('viewBox', [0, 0, width, height]);
    const delay = 750;
    svg.append('g')
        .call(xAxis, x);
  
    svg.append('g')
        .call(yAxis, y);
  
    let group = svg.append('g');
  
    let rect = group.selectAll('rect');
  
    return Object.assign(svg.node(), {
      update() {
        const data = store.getState().avarageLoad10MinWindow;
        const t = svg.transition()
          .duration(delay);
  
        rect = rect
          .data(data)
          .join(
            enter => enter.append('rect')
              .style('mix-blend-mode', 'darken')
              .attr('fill', '#632ca6')
              .attr('x', d => x(d.time))
              .attr('y', d => y(0))
              .attr('width', width/data.length)
              .attr('height', 0),
            update => update,
            exit => exit.call(rect => rect.transition(t).remove()
              .attr('y', y(0))
              .attr('height', 0))
          );
  
        rect.transition(t)
          .attr('y', d => y(d.value))
          .attr('height', d => y(0) - y(d.value));
  
        group.transition(t)
          .attr('transform', 'translate(0,0)');

        svg.selectAll('g.y.axis')
          .call(yAxis);
      }
    });
    }
}
