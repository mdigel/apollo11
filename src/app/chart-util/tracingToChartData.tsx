interface resolverObjForD3Template {
  package: string;
  nominal: number;
  financing_type: string;
}

const tracingToChartData = data => {
  const output = [];

  const dataFirstRemoved = data.resolvers.slice(1);

  dataFirstRemoved.forEach(resolver => {
    const resolverObj1: resolverObjForD3Template = {
      package: resolver.path.join('-'),
      nominal: resolver.startOffset / 10000,
      // nominal: 150,
      financing_type: 'receive',
    };

    const resolverObj2: resolverObjForD3Template = {
      package: resolver.path.join('-'),
      nominal: -1 * (resolver.duration / 10000 + resolver.startOffset / 10000),
      // nominal: -160,
      financing_type: 'pay',
    };

    output.push(resolverObj2);
    output.push(resolverObj1);
  });

  return output;
};

export default tracingToChartData;
