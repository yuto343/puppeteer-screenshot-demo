import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const URL =
  "https://373cdb0--63d0ccabb5d2dd29825524ab.chromatic.com/iframe.html?id=dialog%EF%BC%88%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AD%E3%82%B0%EF%BC%89-dialog--form-dialog&viewMode=story";
const BUTTONTEXT = "FormDialog";

const takeScreenshot = async (url, buttonText) => {
  // 1.先に保存先フォルダを作成
  const formattedDate = getFormattedDate(new Date());
  const dirPath = path.join("screenshots", formattedDate);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 2.ブラウザを起動
  const browser = await puppeteer.launch();

  // 3.指定されたURLのスクリーンショットを取得
  // a.新しいページを作成
  const page = await browser.newPage();
  await page.goto(url);

  // b.ボタンをクリックしてフォームを開く
  await page.evaluate((buttonText) => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const targetButton = buttons.find((button) =>
      button.textContent.includes(buttonText)
    );
    if (targetButton) {
      targetButton.click();
      return;
    }
  }, buttonText);

  // c.スクリーンショットの撮影
  await delay(1 * 1000); // フォームが開くアニメーション終了まで1秒まつ
  const urlPath = url.replace(/https?:\/\//, "").replace(/[\/:]/g, "_");
  const filePath = path.join(dirPath, `${urlPath}.png`);
  await page.screenshot({ path: filePath });

  // 4.ブラウザを閉じる
  await page.close();
  await browser.close();
};

// フォルダ名に使用する日付を作る関数
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので+1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
};

// 一定時間待機する関数
const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

takeScreenshot(URL, BUTTONTEXT);
