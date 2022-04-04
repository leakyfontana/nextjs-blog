import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
      <Html lang="en">
        <Head />
        <body className="flex flex-col items-center justify-center gap-0 bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }