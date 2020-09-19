import * as d3 from 'd3';

const dataPrepForChart = data => {
  const nest = d3
    .nest()
    .key(d => d.package)
    .rollup(packages => {
      let obj = {};
      let netNominal = d3.sum(packages, d => d.nominal);

      let key: string;
      if (netNominal >= 0) {
        key = 'surplus';
      } else {
        key = 'deficit';
      }

      obj[key] = Math.abs(netNominal);

      let nominal = d3
        .nest()
        .key(d => d.financing_type)
        .rollup(financing => d3.sum(financing, d => d.nominal))
        .entries(packages);

      nominal =
        nominal.length > 1 ? d3.min(nominal, d => Math.abs(d.value)) : 0;
      obj['package'] = packages[0].package;
      obj['nominal'] = nominal;
      obj['total'] = obj['nominal'] + obj[key];

      return obj;
    })
    .entries(data);

  return nest;
};

export default dataPrepForChart;
