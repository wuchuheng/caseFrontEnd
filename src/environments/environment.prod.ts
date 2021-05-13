const env: 'product' | 'dev' = 'product'
const commons = {
  production: true,
  iconFontJsUrl: '//at.alicdn.com/t/font_2544358_hxb85yyv7ah.js'
}
export const environment =
  // @ts-ignore
  env === 'dev' ? {
  apiUrl: 'http://127.0.0.1:3000',
  graphQLUrl: 'http://127.0.0.1:5000',
    ...commons
  } : {
    apiUrl: 'http://case-upload.42.huizhouyiren.com',
    graphQLUrl: 'http://caseserver.42.huizhouyiren.com/graphql',
    ...commons
  }

