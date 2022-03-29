# Rocket League Stats (rls)

Simple CLI to get Rocket League players stats, using [puppeteer](https://github.com/puppeteer/puppeteer) so scrap content from [Tracker Network](https://rocketleague.tracker.network/):

```sh
Usage: rls [options] [command]

Options:
  -h, --help      display help for command

Commands:
  rank [options]  Get player(s) rank.
  help [command]  display help for command
```

## Install

```sh
$ git clone https://github.com/NoeSamaille/rl-stats-cli
$ cd rl-stats-cli
$ npm i -g ./
$ rls rank --help
```

### **Optionnal**: WSL prereqs

On WSL, I needed following libs for puppeteer to run out of the box, without additional launch options for the browser ([More info](https://github.com/puppeteer/puppeteer/issues/1837)):

```sh
$ sudo apt install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
```

## Examples

```sh
$ cat <<EOF > players.json
["EpicID1","EpicID2","EpicID3"]
EOF
$ rls rank
```

```sh
$ cat <<EOF > players.json
["EpicID1","EpicID2","EpicID3"]
EOF
$ rls rank --playlist double
```
