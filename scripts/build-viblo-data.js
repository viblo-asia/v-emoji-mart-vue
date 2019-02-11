var fs = require('fs');
var emojiData = require('markdown-it-emoji/lib/data/full.json');
var _keys = require('lodash/keys');
var _transform = require('lodash/transform');
var twemoji = require('twemoji');
var { compress } = require('../src/utils/data')

const set = 'viblo';

function getUrlEmoji(value) {
    const emojiToHex = twemoji.convert.toCodePoint(value.trim(''))
    const src = emojiToHex.replace(/-fe0f/i, '').replace(/-200d-.+/i, '')

    return `https://abs.twimg.com/emoji/v2/72x72/${src}.png`
}

const data = {
    compressed: true,

    categories: [
        {
            id: 'people',
            name: 'Smileys & People',
            emojis: _keys(emojiData)
        }
    ],

    emojis: _transform(
        emojiData,
        (result, value, key) => {
            result[key] = {
                name: `:${key}:`,
                short_names: [key],
                id: key,
                text: `:${key}:`,
                emoticons: [],
                custom: true,
                skin: null,
                imageUrl: getUrlEmoji(value)
            }
        },
        {}
    ),

    aliases: {}
}

fs.writeFile(`data/${set}.json`, JSON.stringify(compress(data)), (err) => {
    if (err) throw err
})
