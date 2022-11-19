# はじめに

- [アイコンシステム](/commands/IconImporter/README.md)
- 環境構築がまだの方
  - （推奨）Docker を利用する場合は[こちら](#docker-を使用した環境構築)から環境構築をしてください
  - Windows ユーザの場合[こちら](#windows-での環境構築)から環境構築をしてください
  - Mac ユーザの場合[こちら](#mac-での環境構築)から環境構築をしてください
- 作業を始める方はこのまま読み進めてください
- その他、詳細は Figjam を確認してください
  - [Figjam リンク](https://www.figma.com/file/4GDJxY1NOzY3wuPfgGhpph/PageMap?node-id=554%3A485)

# 新しく作業を始める場合

- チケットを取る
  - GitHub の[チケット置き場](https://github.com/orgs/RyoheyMeeting/projects/1)から取り組むチケットを選ぶ
  - 選んだチケットの Assigneers に自分を追加
  - チケットを「作業中」に移動
- 編集作業はブランチを切って始めます

```
# mainブランチに切り替え
git checkout main

# mainブランチになっているか確認
git status
# --> On branch main
# --> Your branch is up to date with 'origin/main'

# mainブランチを最新の状態に更新
git pull origin main

# 新規ブランチの作成と切り替え（ブランチ名には適当な名前を付ける。コンポーネント名を含めておくといいかも）
git checkout -b feature/{ブランチ名}

# 現在の状態を確認
git status
# --> On branch feature/{ブランチ名}
```

# 途中から作業を始める場合

- 作業していたブランチに切り替えてから始めます

```
# ブランチ一覧を確認
git branch
# --> feature/hoge
# --> feature/{ブランチ名}
# --> main

# ブランチを作業ブランチに切り替え
git checkout feature/{ブランチ名}

# ブランチが切り替わったことを確認
git status
# --> On branch feature/{ブランチ名}
```

# 動作確認

- ローカルサーバーを起動させてブラウザから動作確認できます

```
### dockerの場合 ###
# コンテナの起動
docker-compose up -d
 => フロントへアクセス：host.docker.internal:3000
 => Storybookへアクセス：host.docker.internal:6006

### docker以外 ###
# ローカルサーバの起動
yarn start
 => ブラウザからlocalhost:3000にアクセス

# storybookの起動(もう１つコンソールを開く必要がある)
yarn storybook
 => ブラウザからlocalhost:6006にアクセス
```

# ある程度実装したら commit

- 以下を実行

```
# 構文チェック&フォーマット修正（エラーが出たら修正してください）
yarn fixall

# 編集を追加
git add .

# commit
git commit -m "コメント（何を反映したのかを書く）"

# git commit でエラーが出た時
git config --global user.email "自分のメールアドレス"
git config --global user.name "自分のユーザ名"
```

# アップロード

- 以下を実行

```
# 全てコミットしているか確認
git status
# --> On branch feature/{ブランチ名}
# --> nothing to commit, working tree clean

# アップロード
git push origin feature/{ブランチ名}
```

# PR 作成

- GitHub にアクセスして Pull Request（PR）を出しましょう。
- PR でやること
  - ブランチ情報を確認
    - `main <- feature/{作成したブランチ名}`になっているか
  - コンフリクトしていないか確認
  - タイトルを書く
  - テンプレートに従って PR 内容を書く
  - Assigneers に自分を割り当て
  - Development にチケットを割り当て

# CI チェックが通っているか確認

- PR を出すと自動でチェックが走るので、チェックが通っているか確認しましょう
- チェックが通ったら一旦チケットを「レビュー待ち」に移動しよう
- ここまで無事に出来たらレビューを誰かに頼もう

# レビュー完了後

- コンフリクトが無ければ PR をマージする
  - コンフリクトがあったら解消して、一応もう一回レビューしてもらう
- チケットを「完了！」に移動する
- Figma から実装したコンポーネントを探し、横にあるアイコンを「done」にする
- 全て終わったら Discord で共有して、称え合おう！
  - チケットのリンクも載せておくと何をしたか分かりやすい

# 環境構築

## Docker を使用した環境構築

- （Windows のみ）事前に WSL2 を有効化する

  - [参考](https://www.kagoya.jp/howto/cloud/container/wsl2_docker/)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)をインストール
- 以下のコマンドを実行

```
# クローンして移動
git clone https://github.com/RyoheyMeeting/ryoheymeeting_front.git
cd ryoheymeeting_front
```

- 環境変数をコピーする
  - プロジェクトディレクトリに`.env`ファイルを作成し、以下の Notion の環境変数をコピー
    - [フロントエンドの環境変数](https://www.notion.so/01afb9b165af487ea46840d24e0e6bd5)
  - プロジェクトディレクトリに`.env.firebase`ファイルを作成し、以下の Notion の環境変数をコピー
    - [バックエンドの環境変数](https://www.notion.so/Firebase-0c1e54a15216468981495a2de4e8abc7)

```
# 環境作成
docker-compose build

# コンテナの立ち上げ
docker-compose up -d
```

### 完了したら

- 以下の URL にアクセスしてみよう
  - フロント：http://host.docker.internal:3000/
  - Storybook：http://host.docker.internal:6006/
  - Firebase：http://host.docker.internal:4000/
- 正常にアクセス出来たら完了！
- ※Firebase のバグで、localhost に接続すると Realtime Database に繋がらなくなります。その場合は、上記の URL にアクセスして以下を試してください
  - cookie 削除
  - スーパーリロード
    - [各ブラウザでのスーパーリロード方法](https://ao-system.net/note/69)

## Windows での環境構築

### Git のインストール

- 公式からダウンロード
  - [Git - Downloading Package](https://git-scm.com/download/win)
- インストールダイアログに従ってインストール
  - `Configuring the line ending conversions`の設定は`Checkout as-is, commit as-is`がおすすめ

### fnm のインストール

- PC に Node がインストールされている場合は全てアンインストールする
- Powershell を管理者権限で起動し、以下を実行

```
# パッケージ管理ツール「Chocolatey」をインストール
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 確認
choco list -l

# fnmをインストール
choco install fnm -y

# コマンドプロンプト用に以下を実行
reg add "HKEY_CURRENT_USER\SOFTWARE\Microsoft\Command Processor" /v AutoRun /t "REG_SZ" /d "call c:%HOMEPATH%\.cmdrc.cmd" /f

# パワーシェルの設定ファイルを確認
$Profile
# --> %HOMEPATH%/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1
```

- `%HOMEPATH%/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1`に以下を追記(ファイルが無ければ作成)

```
fnm env --use-on-cd | Out-String | Invoke-Expression
```

- ホームディレクトリに.cmdrc.cmd を作成して以下を追記

```
@ECHO OFF

IF "%MYSTARTUP_INIT%"=="OK" (
    EXIT /b
)

SET MYSTARTUP_INIT=OK

REM Setup fnm
FOR /f "tokens=*" %%z IN ('fnm env --use-on-cd') DO CALL %%z

if exist .node-version (
	SET /P LOCAL_NODE_VERSION=<.node-version
	fnm use %LOCAL_NODE_VERSION%
)
```

- fnm で node を追加

```
# v16.14.2をインストールする場合
fnm install 16.14.2

# 確認
fnm list
# --> * v16.14.2 default
# --> * system

# バージョンを変更
fnm use 16.14.2
fnm current
# --> v16.14.2
```

### リポジトリのクローン

- 以下を実行

```
git clone https://github.com/RyoheyMeeting/ryoheymeeting_front.git
git clone https://github.com/RyoheyMeeting/ryoheymeeting_firebase.git
```

- 環境変数をコピーする
  - プロジェクトディレクトリに`.env`ファイルを作成し、以下の Notion の環境変数をコピー
    - [フロントエンドの環境変数](https://www.notion.so/01afb9b165af487ea46840d24e0e6bd5)
- ryoheymeeting_firebase リポジトリは別途セットアップする

### 完了したら

- [こちら](#%E7%A2%BA%E8%AA%8D)から環境を確認
- また、以下の URL にアクセスしてみましょう
  - フロント：http://localhost:3000/
  - Storybook：http://localhost:6006/
  - Firebase：http://localhost:4000/
- 正常にアクセス出来たら完了！

## Mac での環境構築

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
# 再読み込み
source ~/.zshrc
# anyenvのinit
anyenv install --init
```

### その他インストール

- 以下を実行

```
# nodenvをインストール
anyenv install nodenv

# node.jsのインストール
nodenv install 16.11.0

# npmのバージョン合わせ
nodist npm match

# yarnのインストール
npm install -g yarn
```

### リポジトリのクローン

- 以下を実行

```
git clone https://github.com/RyoheyMeeting/ryoheymeeting_front.git
git clone https://github.com/RyoheyMeeting/ryoheymeeting_firebase.git
```

- 環境変数をコピーする
  - プロジェクトディレクトリに`.env`ファイルを作成し、以下の Notion の環境変数をコピー
    - [フロントエンドの環境変数](https://www.notion.so/01afb9b165af487ea46840d24e0e6bd5)
- ryoheymeeting_firebase リポジトリは別途セットアップする

### 完了したら

- [こちら](#%E7%A2%BA%E8%AA%8D)から環境を確認
- また、以下の URL にアクセスしてみましょう
  - フロント：http://localhost:3000/
  - Storybook：http://localhost:6006/
  - Firebase：http://localhost:4000/
- 正常にアクセス出来たら完了！

# 確認

- Windows・Mac での環境構築が終了したらこちらを実行して正しく構築できたかを確認してください。

```
node -v
# --> v16.14.2
npm -v
# --> 8.0.0    # バージョンが異なる場合があります
yarn -v
# 1.22.17      # バージョンが異なる場合があります
git --version
# --> git version 2.33.0.windows.2  # バージョンが異なる場合があります
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
  - Docker
  - Git Graph
  - GitHub Pull Requests and Issues
  - GitLens
  - Remote - Containers
  - vscode-icons
  - vscode-styled-components
