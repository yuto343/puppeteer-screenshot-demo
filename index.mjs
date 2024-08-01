import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const takeScreenshots = async (urls) => {
  // 1.先に保存先フォルダを作成
  const formattedDate = getFormattedDate();
  const dirPath = path.join("screenshots", formattedDate);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 2.ブラウザを起動
  const browser = await puppeteer.launch();

  // 3.指定されたURLのスクリーンショットを取得
  for (const url of urls) {
    // 新しいページを作成
    const page = await browser.newPage();
    // 指定されたURLに移動
    await page.goto(url);

    // ファイル名として使うため、URLからhttps://や/を削除して_に変換
    const urlPath = url.replace(/https?:\/\//, "").replace(/[\/:]/g, "_");

    const filePath = path.join(dirPath, `${urlPath}.png`);
    await page.screenshot({ path: filePath });
    await page.close();
  }

  // 4.ブラウザを閉じる
  await browser.close();
};

// フォルダ名に使用する日付を作る関数
const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので+1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
};

// URLsをファイルから読み込む関数
const readUrlsFromFile = (filePath) => {
  const urls = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
  return urls;
};

// URLsファイルのパス
const urlsFilePath = "urls.txt";

// URLsを読み込んでスクリーンショットを撮る
const urls = readUrlsFromFile(urlsFilePath);
takeScreenshots(urls);
