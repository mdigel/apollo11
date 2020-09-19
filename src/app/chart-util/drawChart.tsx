import * as d3 from 'd3';

const draw = (div, nest, propsWidth, propsHeight) => {
  // remove previous chart - if data changes or window size
  d3.select('#canvas > *').remove();

  const svg = d3
    .select(div)
    // .append('svg')
    .attr('width', propsWidth)
    .attr('height', propsHeight);

  const margin = {top: 20, right: 20, bottom: 30, left: 150};
  const width = svg.attr('width') - margin.left - margin.right;
  const height = svg.attr('height') - margin.top - margin.bottom;

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(nest, d => d.value.total)])
    .range([1, width])
    .nice();

  const y = d3
    .scaleBand()
    .domain(nest.map(d => d.key))
    .range([height, 0])
    .padding(0.1);

  var z = d3.scaleOrdinal().range(['#dbdbdb', '#00b774', '#fe434f']);

  g.append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  g.append('g')
    .attr('class', 'axis y-axis')
    .call(d3.axisLeft(y).ticks(null, 's'));

  g.append('g')
    .selectAll('g')
    .data(
      d3.stack().keys(['nominal', 'surplus', 'deficit'])(
        nest.map(d => d.value),
      ),
    )
    .enter()
    .append('g')
    .attr('fill', function (d) {
      return z(d.key);
    })
    .selectAll('rect')
    .data(d => d)
    .enter()
    .append('rect')
    .attr('x', d => x(d[0]))
    .attr('y', d => y(d.data.package))
    .attr(
      'height',
      y.bandwidth() > 40 ? 40 : y.bandwidth() < 10 ? 10 : y.bandwidth(),
    )
    .attr('width', d => x(d[1]) - x(d[0]));
};

export {draw as default};
