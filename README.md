# このフォルダの参考と使い方など

このフォルダの参考：[開発フォルダの使い方](https://destiny-pot-bb1.notion.site/25fc1bf643274987b168b20504094181)

Gulpの使い方：[Gulpを使う](https://destiny-pot-bb1.notion.site/Gulp-b2f12f43d67e44c1904adc342f2b49ac)

# 目的

- 複数人で制作する際に、成果物を一定の水準のものにするため。
- コードの可読性を損なわないようにするため。
- 保守性・メンテナンス性を損なわないようにするため。
- 業務を効率化するため。

# プロジェクトの構成

- GitHubのフォルダディレクトリを参照。（GitHubにベースとなるディレクトリをアップロードしてからの運用を想定）

## 各フォルダ・ファイルの役割

### Sassまわり

- animation：jsのclass付与によるアニメーションの記述をまとめたフォルダ。keyframesに関しては思案中
- foundation：リセットcssと基盤となるcssをまとめたフォルダ。
- layout：レイアウトに関するcssをまとめたフォルダ。

    [PRECSS - Manage your CSS with prefixes.](https://precss.io/ja/#layout)

- mixin：@mixinに関してまとめたフォルダ。
- module：使いまわせるモジュールのcssをまとめたフォルダ。blockとelementに分けられる。

    [PRECSS - Manage your CSS with prefixes.](https://precss.io/ja/#module)

- page：ページ各種の限定的なcssをまとめたフォルダ。
- plugins：プラグインに上書きするcssをまとめたフォルダ。
- setting：Sass変数を中心に各種設定に関してまとめたフォルダ。
- utility：汎用クラスのcssをまとめたフォルダ。

### Gulpまわり

- gulpfile.js：Gulpでどんなタスク処理をするかが書いてあるファイル。
- package.json：Gulpで使用する設定ファイル。
- node_modulesフォルダ：Gulpを動かすのに必要なプラグインが入っている。


# 命名規則

・共通の原則として、英語で書くこと。ただし「特定商取引法」など、翻訳が困難または冗長になるときは、「tokusyoho」のように書くなど例外は認める。（このような場合、慣例を参照する）

## CSS

- 基本的な命名規則はPRECSSを参考にする。

    [PRECSS - Manage your CSS with prefixes.](https://precss.io/ja/)

    [CSS設計完全ガイド サンプルデータサイト](https://css-architecture-perfect.guide/)

- ただし、2単語以上をつなげる場合はケバブケースでつなげること。

    ex.) className → class-name （PRECSSではキャメルケースとなっている）

- ページ独自のスタイルはページの名前を接頭辞とすることとする。

    ex.) top_block_element__modifier

- 汎用的に使用可能な名前

> ・_wrapper
・_inner
・_header
・_body
・_footer

これらは後述する5つのグループいずれにおいても、必要に応じて汎用的に使用することができます。_wrapperはモジュールのルート要素の親クラスとして使用することを想定しており、子要素ではありませんが「そのモジュールに属する」として、子要素と同じようにアンダースコアで結合します。

※PRECSSのガイドページに同様の内容の記載があります。

- 単語を省略する場合

> ・category(ies) → cat(s)
・column → col
・level → lv
・description → desc
・button → btn
・image → img
・thumbnail → thumb
・number → num
・text → txt
・small → sm
・medium → md
・large → lg
・key visual → kv
・call to action → cta

※PRECSSのガイドページの内容に変更を加えています。

## JavaScript

- 変数名・定数名・関数名はローワーキャメルケースを使用することとする。

    ex.) variableName

## PHP

- 変数名・定数名・関数名はスネークケースを使用することとする。

    ex.) function_name

## 画像ファイル

- 基本的には以下の接頭辞から始めること。（適切なものがない場合は管理者に相談すること）

> ・bg_ → 背景画像
・btn_ → ボタンに関すること
・deco_ → 装飾
・icon_ → アイコン
・img_ → 一般画像
・logo_ → 企業やブランドのロゴ
・thumb_ → 生地などのサムネイル
・txt_ → 文章を画像化したもの

- 画像ファイルの形式は解像度とファイルの重さを考慮して適宜判断すること。
- 2単語以上をつなげる場合はケバブケースでつなげること。

# コーディングスタイル

## インデント

- インデントは全て半角スペース4つとすること。

## コメントアウト

### HTML

- 囲っているものの閉じタグに、次のようにコメントすること。
ユーティリティクラスは書かなくて良いものとする。

```html
<div class="wrapper">
    <h2 class="ttl">Heading level02</h2>
    <p class="desc">Into description text</p>
</div>
<!-- /.wrapper -->
```

※PRECSSのガイドページを参考にしています。

### CSS・Sass

- Blockごとの開始部分に、次のようにコメントすること。
また必要に応じて、メモのような書き方も認める。

```scss
/*---------- .top-kv ----------*/
.top-kv {
    width: 100%;
    height: 80px;

    &_inner {
        max-width: 1200px; //メモがかけます。
        width: 96%;
        margin: 0 auto;
    }
}
```

- SassはDartSassで記述すること。
- ネストは原則3段階を目安に、しすぎないこと。

### JavaScript

- 機能ごとの開始部分に、次のようにコメントすること。
また必要に応じて、メモのような書き方も認める。

```jsx
/*---------- 関数の役割が入る ----------*/
const constantName; //メモがかけます。
let variableName;

const functionExe = () => {}
```

### PHP

- 機能ごとの開始部分に、次のようにコメントすること。
また必要に応じて、メモのような書き方も認める。

```php
<?php
/*---------- 関数の役割が入る ----------*/
add_action('place', 'function_exe');
function function_exe()
{
    /* methodの役割が入る */
    method_exe(); //メモがかけます。
}
?>
```

※WordPressのテンプレート関数の場合は必要ありません。

# 禁止事項

## 保守性の観点

- !importantは原則使わないこと。使う場合は管理者に相談すること。
- 要素セレクタに個別のスタイルを装飾しないこと。（リセットCSSとベースのCSSはのぞく）
- 詳細度をみだりにあげないこと。
- デバッグやテストのためのコードをテスト完了後は消すこと。
- 自己流の単語の省略方法は使用しないこと。使う場合は管理者に相談すること。
- ベンダープレフィックスを必要以上につけないこと。（基本的に自動で吐き出されるようにはするつもりです）
- gulpfile.jsは編集しないこと。編集する場合は管理者に相談すること。

## 信頼性の観点

- ネットで検索したサンプルのコードをむやみに使いまわさないこと。

# 制限事項

## 保守性の観点

- 必要な場合を除き、コンポーネントにmarginをつけない。

# 推奨事項

- classや関数名は役割が推測しやすいものにすること。
- 改行やインデントをみやすいようにすること。
- 改善点や不明点があれば、管理者に提案・相談すること。
- 原則、marginの方向は統一すること。
    - 上下方向のmarginはtopに与える。
    - 左右方向のmarginはleftに与える。
