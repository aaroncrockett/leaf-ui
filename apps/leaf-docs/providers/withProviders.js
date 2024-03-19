import withLayout from './withLayout'

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x)

const withProviders = (options) => compose(withLayout(options))

export default withProviders
// Use if we we have more than one provider.
// I like this option because we can compose many providers into one.
// I still prefer context though for providing functionality like auth.
// I suspect I can combine the two approaches.
// Consider performance.
