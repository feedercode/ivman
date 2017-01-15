System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  map: {
    typescript: './scripts/typescript.min.js'
  },
  packages: {
    "src": {
      defaultJSExtensions: true,
      defaultExtension: "ts"
    }
  }
});