import Document, { Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <html lang="th">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}