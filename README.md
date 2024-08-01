# puppeteer でスクリーンショットを撮るデモ~ダイアログ開いた撮るバージョン~

## 使い方

`npm run screenshot`または`node index.mjs`を実行することで、[デザインシステムのダイアログページ](https://373cdb0--63d0ccabb5d2dd29825524ab.chromatic.com/iframe.html?id=dialog%EF%BC%88%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AD%E3%82%B0%EF%BC%89-dialog--form-dialog&viewMode=story)のダイアログが開かれ、そのダイアログのスクリーンショットが撮られます。

撮影されたスクリーンショットは`./screenshots/{{日時}}/{{url}}.png`という形式で保存されます。

このデモでは、「`FormDialog`というテキストを含んでいるボタン要素をクリックする」という操作を行なっています。その辺りを参考にしていただければと思います。
