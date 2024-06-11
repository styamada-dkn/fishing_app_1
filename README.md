## 釣り自慢倶楽部デモサイト

---

### 1. WEBサービス概要

サービス名

    釣り自慢倶楽部デモサイト

サービスについて

    当サービスはポートフォリオサイトとして作成しております。
    釣り好きユーザーに対して釣果自慢を行える場を提供する事を目的に
    写真や記事投稿などの機能をユーザーに提供するサービスです。

サービスURL

    [www.hogehoge.com]()

---
### 2.機能一覧

- 釣り記事投稿（新規・修正・削除）
- 釣り画像投稿（新規・修正・削除）
- コメント（新規・修正・削除）
- いいね送信
- ログイン認証（Googleログイン・デモユーザー）
- ページネーション
- カテゴリー検索

---

### 3. ご利用方法

<u>ご利用にあたって</u>

    記事投稿（画像投稿）やコメント、いいねを行う場合はログインが必要です。
    ログインしない場合でも記事の閲覧は行えます。

> [!IMPORTANT]
> 当サービスはあくまで個人的なポートフォリオサイトになるので、  
> 個人情報を収集しない理念の元、作成しております。

    よってGoogleでログインした場合、記事投稿などでデータベースへ登録されるはずのユーザ名、Emailなど
    の情報はデモユーザーに置き換わる仕様にしています。
    Googleログイン後に画面右上に表示されるプロフィール画像をクリックして頂くと、どのデモユーザーに
    置き換わっているか確認できます。

![プロフィール画像](https://github.com/styamada-dkn/fishing_app_1/blob/main/public/readme_image/readme_Fishing_1.jpg)

ログインアカウント

    Googleログイン以外にデモユーザーでのログインが行えます。
    あらかじめデモユーザーを６ユーザー作成してありますのでその中からご利用ください。
    尚、パスワード認証は省略しておりますが、入力文字チェックは行っております。
    ログイン画面に詳細は掲載しておりますのでご確認ください。

操作について

    一般的なブログ投稿サイトをミニマムにしたものですので操作面は説明するまでもない
    と思います。自由にご利用ください。
    要点だけ以下に記載します。

1. ログイン・ログアウトは画面右上のサムネイル画像をクリックしてください。
1. 記事の投稿はログインが必要です。
1. 記事の編集・削除は記事を投稿したユーザーのみ行えます。
1. 投稿画像は１投稿につき３画像まで登録できます。
1. コメント投稿はログインが必要です
1. コメントの編集・削除はコメントを投稿したユーザーのみ行えます。
1. いいね送信はログインが必要です。
1. いいね送信は１投稿につき同じユーザーで１回のみ行えます。

---
### 4.使用技術一覧

| 種類           | 使用技術                                 |
| :------------- | :--------------------------------------- |
| フロントエンド | Next.js、React、TypeScript、Tailwind CSS |
| バックエンド   | Next.js、TypeScript                      |
| DB             | Supabase                                 |
| 認証           | NextAuth                                 |
| 画像ストレージ | Supabase Storage                         |
| ホスティング   | Vercel                                   |
| その他         | ESLint、Prettier、husky、lint-staged     |

---

### 5.ER図

```mermaid
erDiagram

    posts ||--o{post_comments:""
    posts ||--o{post_liked:""
    posts ||--o{post_photos:""
    posts ||--||mst_category:""
    posts ||--||mst_accounts:""
    mst_accounts ||--o|mst_credentials:""
    post_comments ||--||mst_accounts:""
    post_liked ||--||mst_accounts:""


    posts {
        int8 id PK
        varchar title
        text content
        date fish_date
        varchar fish_result
        varchar weather
        varchar temperature
        varchar water_temperature
        varchar category_id FK "not null"
        varchar location
        int8 creator_id FK "not null"
        timestampz created_at
        timestampz updated_at

    }

    post_comments{
        int8 id	PK
        text comment
        int8 commenter_id FK "not null"
        int8 post_id FK	"not null"
        timestampz created_at
        timestampz updated_at
    }

    post_liked{
        int8 id	PK
        int8 post_id FK "not null"
        int8 liked_user_id FK "not null"
        timestampz created_at
        timestampz updated_at
    }

    post_photos{
        int8 id	PK
        int8 post_id FK	"not null"
        text photo_area "photo1/photo2/photo3"
        text image_url
        timestampz created_at
        timestampz updated_at
    }

    mst_category{
        varchar id	PK
        varchar label "not null"
        varchar link  "not null"
        int2 node_type	"not null 1:親ノード2:子ノード"
        int2 display_order	"not null 表示順"
        timestampz　created_at
        
    }

    mst_accounts{
        int8 id PK
        text email "unique デモユーザーのメールアドレス"
        varchar name "not null"
        text thumbnail	"デモユーザーのサムネイルのパス"
        timestampz　created_at
        timestampz　updated_at
    }

    mst_credentials{
        int8 id	 PK
        int8 account_id FK "not null"
        varchar user_name "not null"
        varchar password "not null"
        timestampz created_at
        timestampz updated_at
    }

```

#### 画像ストレージ

|バケット名 | フォルダ名 |メモ|  
|:----|:---- |:---- |
|avatar| [mst_accounts.id] |デモユーザーのAvatar画像|
|posts| [post_id]/photo1..3/ |投稿画像  フォルダ別に３画像まで|


---

### 6.今後の展望
まだ足りない部分、追加したい機能、取り入れたい技術もありますが終わりが見えなくなってしまうので一旦区切りとしました。随時、アップデートを行っていきたいと思います。

---

### 参考文献
メインで参考にさせて頂きました。  

「実践Next.js App Routerで進化するWebアプリ開発」（技術評論社）

