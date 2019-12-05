const IdGen = (prefix) => `${prefix}-${Math.random().toString().replace('.', '')}`;

export default IdGen