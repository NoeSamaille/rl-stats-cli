#!/usr/bin/env node

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const commander = require('commander');
const fs = require('fs');

const program = new commander.Command();


const getRanks = async (opts) => {
    let players = []
    try {
        players = JSON.parse(fs.readFileSync(opts.players));
        for (const player of players) if ((typeof player) !== 'string') throw '';
    } catch (error) {
        console.log("Cannot read players file / wrong file type.");
    }
    const browser = await puppeteer.launch();
    for (const player of players) {
        const page = await browser.newPage();
        await page.goto(`https://rocketleague.tracker.network/rocket-league/profile/epic/${encodeURIComponent(player)}/overview`, {
            waitUntil: 'networkidle0',
        });
        const $ = cheerio.load(await page.content());
        const table = [];
        $('table.trn-table tbody tr').each((i, element) => {
            var name = $(element).find('td.name div.playlist').text();
            var rankText = $(element).find('td.name div.rank').text();
            var rank = $(element).find('td.rating div.mmr div.value').text();
            if (!opts.playlist || name.toLowerCase().includes(opts.playlist.toLowerCase())) table.push({
                playlist: name,
                rank: rankText,
                mmr: rank
            });
        });
        console.log(`\n--> ${player}`);
        console.table(table);
        console.log(`--`);
    }
    await browser.close();
}


const rankCmd = program.command('rank');
rankCmd.description('Get player(s) rank.')
    .option('--playlist <playlist>', 'The playlist to filter.')
    .option('--players <filename>', 'The path to JSON file containing player epic IDs.', 'players.json')
    .action(() => {
        getRanks(rankCmd.opts());
    });

program.parse(process.argv);
