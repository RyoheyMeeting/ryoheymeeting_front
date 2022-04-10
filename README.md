# はじめに

- 環境構築がまだの方
  - Windows ユーザの場合[こちら](#nodejs-%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E7%AE%A1%E7%90%86%E3%83%84%E3%83%BC%E3%83%AB%E3%81%AE%E5%B0%8E%E5%85%A5windows-%E3%83%A6%E3%83%BC%E3%82%B6%E3%81%AE%E5%A0%B4%E5%90%88)から環境構築をしてください
  - Mac ユーザの場合[こちら](#nodejs-%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E7%AE%A1%E7%90%86%E3%83%84%E3%83%BC%E3%83%AB%E3%81%AE%E5%B0%8E%E5%85%A5mac-%E3%83%A6%E3%83%BC%E3%82%B6%E3%81%AE%E5%A0%B4%E5%90%88)から環境構築をしてください
  - Docker を利用する場合はこちら[こちら](#nodejs-%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E7%AE%A1%E7%90%86%E3%83%84%E3%83%BC%E3%83%AB%E3%81%AE%E5%B0%8E%E5%85%A5docker-%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)から環境構築をしてください
- 作業を始める方はこのまま読み進めてください

# 新しく作業を始める場合

- 編集作業はブランチを切って始めます

```
// mainブランチに切り替え
> git checkout main

// mainブランチになっているか確認
> git status
On branch main
Your branch is up to date with 'origin/main'.
...

// mainブランチを最新の状態に更新
> git pull origin main

// 新規ブランチの作成と切り替え(-bはブランチを新しく作りながら切り替えるというオプション)
> git checkout -b feature/{ブランチ名}

// 現在の状態を確認
> git status
On branch feature/{ブランチ名}
...
```

# 途中から作業を始める場合

- 作業していたブランチに切り替えてから始めます

```
// ブランチを作業ブランチに切り替え
> git checkout feature/{ブランチ名}

// ブランチが切り替わったことを確認
> git status
On branch feature/{ブランチ名}
...

// 作業開始
```

# 動作確認

- ローカルサーバーを起動させてブラウザから動作確認できます

```
// ローカルサーバーの起動
> yarn start
 => ブラウザからlocalhost:3000にアクセス

// storybookの起動
> yarn storybook
 => ブラウザからlocalhost:6006にアクセス
```

# 作業が全て完了したらする事

- 作業が完了したらフォーマットを確認して commit と push をします。

```
// フォーマットの確認（エラーが出たら修正してください）
> yarn fixall

// 反映するファイルを追加（必要なファイルだけ追加します）
> git add ファイル名
// もし全ファイル追加する場合は以下のコマンドでもＯＫ
> git add .

// commit
> git commit -m "コメント（何を反映したのかを書く）"

// push
> git push origin feature/{ブランチ名}
```

- push まで完了したら github にアクセスして Pull Request（PR）を出しましょう。
- PR でやること
  - タイトルを書く
  - 変更内容を書く
  - 更にスクロールしてコンフリクト（編集被り）していないか確認する
    - コンフリクトしている場合はコンフリクトを解消
  - PR を作成したら誰かにレビューをお願いする
  - レビューと CI チェックが完了したらマージ

# 環境構築

## Node.js のバージョン管理ツールの導入(Windows ユーザの場合)

### 事前準備

- node.js を既にインストールしている場合は一度アンインストールしてください。

### nodist の導入

- [こちら](https://github.com/nullivex/nodist/releases)から NodistSetup-vx.x.x.exe をダウンロード
- （x にはバージョンが入ります。今回は v0.9.1 をダウンロードしました。）

### いろいろインストール

- Node.js のインストール

```
> nodist + 16.11.0
> nodist 16.11.0
```

- npm のバージョン合わせ

```
> nodist npm match
```

- yarn のインストール

```
npm install -g yarn
```

### 完了したら

- [こちら](#%E7%A2%BA%E8%AA%8D)から環境を確認

### その他、nodist 関連でエラーが出た場合

- PATH not updated, original length x > 1024 が出た時
  - 環境変数に C:\Program Files (x86)\Nodist\bin を追加しましょう．
- cb.apply is not a function が出た時
  - nodist npm match を実行しましょう。

## Node.js のバージョン管理ツールの導入(Mac ユーザの場合)

既にインストール済みのものがある場合は適宜読み飛ばしてください

- 詳細が知りたい場合やエラーが出た場合は参考サイトを参照
  - https://qiita.com/kyosuke5_20/items/eece817eb283fc9d214f

### Homebrew をインストール

- 以下を実行

```
> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### anyenv をインストール

```
> brew install anyenv
> anyenv init
```

- anyenv init でエラーが出た場合は`~/.zshrc`に以下を追記

```
# anyenvの環境構築 - Qiita https://qiita.com/282Haniwa/items/71a48a10952413416d18
export PATH="$HOME/.anyenv/bin:$PATH"
eval "$(anyenv init -)"
```

- 追記後は zshrc を再読み込みして init する

```
// 再読み込み
> source ~/.zshrc
// anyenvのinit
> anyenv install --init
```

### その他インストール

- 以下を実行

```
// nodenvをインストール
> anyenv install nodenv

// node.jsのインストール
> nodenv install 16.11.0

// npmのバージョン合わせ
> nodist npm match

// yarnのインストール
> npm install -g yarn
```

### 完了したら

- [こちら](#%E7%A2%BA%E8%AA%8D)から環境を確認

## Node.js のバージョン管理ツールの導入(Docker を使用する場合)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)をインストール
- 以下のコマンドを実行

```
// クローンして移動
> git clone https://github.com/RyoheyMeeting/ryoheymeeting_front.git
> cd ryoheymeeting_front

// Dockerのコンテナを作成
> docker-compose up -d

// コンテナのターミナルに入る
> docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                 NAMES
6e330b5eefad   node:16.14.2   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:3000->3000/tcp, 0.0.0.0:6006->6006/tcp   ryoheymeeting_front_ryoheynode_1

// NAMESをコピーしてコマンドを打とう
> docker exec -it ryoheymeeting_front_ryoheynode_1 bash

// ターミナルに入れたらOK
root@6e330b5eefad:/project#
```

### 完了したら

- [こちら](#%E7%A2%BA%E8%AA%8D)から環境を確認

# 確認

- Windows・Mac での環境構築が終了したらこちらを実行して正しく構築できたかを確認してください。

```
> node -v
v16.11.0
> npm -v
8.0.0    // バージョンが異なる場合があります
> yarn -v
1.22.17  // バージョンが異なる場合があります
> git --version
git version 2.33.0.windows.2  // バージョンが異なる場合があります
```

# ダウンロードとパッケージのインストール

- 以下を実行（作業したいディレクトリで実行してください）

```
// リポジトリのダウンロード
> git clone https://github.com/RyoheyMeeting/ryoheymeeting_front.git
// パッケージのインストール
> yarn
```

# その他、作業効率を高めるには

- VSCode おすすめです
- VSCode のおすすめパッケージ
  - vscode-styled-components
