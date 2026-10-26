# Discover Lab コーポレートサイト

個人事業「Discover Lab」の公式サイト（1ページ構成）です。

- React 19 / TypeScript / Vite / Tailwind CSS v4
- アニメーション：Motion（`motion/react`）
- 静的ファイルとしてビルドし、ConoHa WING 等のレンタルサーバーにアップロードして公開します

## 開発

Node.js 20 以上を推奨します。

```bash
# 初回のみ
npm run setup          # = cd frontend && npm install

npm run dev            # 開発サーバー（http://localhost:5173）
npm run build          # 型チェック + 本番ビルド → frontend/dist/
npm run preview        # ビルド結果をローカル確認（http://localhost:4173）
npm run lint
```

`frontend/` ディレクトリ内で同じコマンドを実行しても構いません。

## ディレクトリ構成

```
discover-lab/
├─ package.json              # ルートから frontend のスクリプトを呼び出すラッパー
└─ frontend/
   ├─ index.html             # %SITE_*% は site.ts の値でビルド時に置換
   ├─ vite.config.ts         # SEO/OGP タグ・robots.txt・sitemap.xml 生成、/api プロキシ
   ├─ public/                # そのまま dist/ にコピーされる（.htaccess, OGP画像, favicon）
   └─ src/
      ├─ config/site.ts      # 屋号・タイトル・説明文・公開URL・ナビゲーション
      ├─ content/            # 各セクションの文言（hero / business / profile）
      ├─ styles/theme.css    # ブランドカラー・フォント
      ├─ hooks/              # スクロール状態・現在地セクション
      └─ components/
         ├─ brand/           # ロゴ
         ├─ layout/          # Header / MobileNav / Footer
         ├─ sections/        # Hero / Business / BusinessCard / Profile
         ├─ ui/              # Reveal（スクロール出現）、見出し、背景、区切り線
         └─ visuals/         # ヒーローの地球儀ビジュアル、事業アイコン・パターン
```

## 内容の編集

| 変更したいもの | ファイル |
| --- | --- |
| 屋号・ロゴの文字・`<title>`・meta description・公開URL | `frontend/src/config/site.ts` |
| ブランドカラー・フォント | `frontend/src/styles/theme.css` |
| ヒーローのキャッチコピー | `frontend/src/content/hero.ts` |
| 事業内容 | `frontend/src/content/business.ts` |
| 事業者概要（所在地・開業年月など） | `frontend/src/content/profile.ts` |
| OGP 画像（1200×630） | `frontend/public/og-image.jpg` |
| ファビコン | `frontend/public/favicon.svg`, `apple-touch-icon.png` |

### 事業者概要の未確定項目

`profile.ts` の各項目は `value: null` のとき未確定として扱います。

- `所在地` … 「未設定」と表示（`hideWhenEmpty` なし）
- `開業年月` … `hideWhenEmpty: true` のため非表示

確定したら `value` に文字列を入れるだけで表示されます。「未設定」の文言は `profileSection.emptyLabel` で変更できます。

### OGP 画像を差し替える場合

ファイル名を変える場合は `site.ts` の `ogImage` も合わせて変更してください。

## ConoHa WING へのデプロイ

### 1. 公開URLを設定してビルド

独自ドメインが決まったら `frontend/src/config/site.ts` の `url` を設定します（末尾スラッシュなし）。

```ts
url: 'https://example.com',
```

または、ファイルを変更せず環境変数で指定することもできます。

```bash
SITE_URL=https://example.com npm run build
```

URL を設定すると、以下が出力されます。

- `<link rel="canonical">`、`og:url`、絶対URLの `og:image`（SNS でのプレビュー表示に必要です）
- `sitemap.xml`、および `robots.txt` 内の Sitemap 行

> URL 未設定のままでもビルド・公開はできますが、OGP 画像が相対パスになるため、SNS でシェアしたときに画像が表示されない場合があります。

### 2. アップロード

`frontend/dist/` の **中身すべて**（`.htaccess` を含む）を、ドメインの公開ディレクトリにアップロードします。

- ConoHa WING の公開ディレクトリ：`/home/<ユーザー名>/public_html/<ドメイン名>/`
- 方法：ConoHa コントロールパネルの「ファイルマネージャー」、または FTP / SFTP クライアント（FileZilla など）
- `.htaccess` はドットファイルのため、FTP クライアントで「隠しファイルを表示」を有効にしてください

再デプロイ時は、古い `assets/` 内のファイルを削除してから上書きすると不要なファイルが残りません。

### 3. 独自ドメインと SSL

1. ConoHa コントロールパネル → 「サーバー管理」→「ドメイン」でドメインを追加
2. ドメインの DNS（ネームサーバー）を ConoHa に向ける
3. 「サイト管理」→「サイトセキュリティ」→「独自SSL」で無料 SSL を有効化
4. SSL 有効化後、`public/.htaccess` の「HTTPS へ統一」ブロックのコメントを外して再ビルド・再アップロード

### サブディレクトリに公開する場合

`https://example.com/discover/` のように配下に置く場合は、ベースパスを指定してビルドします。

```bash
BASE_PATH=/discover/ SITE_URL=https://example.com/discover npm run build
```

### `.htaccess` の内容

- gzip 圧縮
- `assets/`（ハッシュ付きファイル名）の長期キャッシュ、`index.html` は毎回再検証
- 基本的なセキュリティヘッダー
- HTTPS / www 統一のリダイレクト（コメントアウト済み）

## 実装メモ

### アニメーション

- `LazyMotion` + `m` コンポーネントで必要な機能のみ読み込み
- `MotionConfig reducedMotion="user"` により、OS の「視差効果を減らす」設定時は移動系アニメーションを無効化。CSS アニメーション・スムーズスクロールも `prefers-reduced-motion` で停止
- 背景のゆらぎ・回転は CSS アニメーション（transform のみ）で実装し、JS 負荷を抑えています

### アクセシビリティ / SEO

- `header` / `nav` / `main` / `section` / `footer` / `dl` によるセマンティックなマークアップ
- 本文へのスキップリンク、`aria-current` による現在地表示、メニューの `aria-expanded`・Esc キーで閉じる
- 装飾 SVG は `aria-hidden`
- `<title>`・description・OGP・Twitter Card・JSON-LD（Organization）を `site.ts` から生成

## 将来 Express API を追加する場合

フロントエンドは `/api` へのリクエストを、開発時に `http://localhost:3000` へ転送する設定済みです（`vite.config.ts` の `server.proxy`。転送先は環境変数 `API_PROXY_TARGET` で変更可）。

推奨構成：

```
discover-lab/
├─ frontend/   # 現在のサイト
└─ backend/    # Express（例：src/index.ts で app.use('/api', router)）
```

- 開発：`backend` を 3000 番で起動し、`frontend` は `npm run dev`。フロントからは `fetch('/api/...')` と相対パスで呼び出す
- 本番：Express が `frontend/dist` を `express.static` で配信しつつ `/api` を提供する形にすると、1つの Node.js アプリとして運用できます（ConoHa VPS 等の Node.js 実行環境が必要。ConoHa WING の静的ホスティングでは Node.js サーバーは常駐できません）
- ルートの `package.json` に `dev:backend` などのスクリプトを追加するか、npm workspaces 化すると管理しやすくなります
