import { getSanitizedData, intersect } from '..';
import { uncompress } from '../data';

export default class NimbleEmojiIndex {
    constructor(data) {
        if (data.compressed) {
            data = uncompress(data);
        }

        this.data = data || {};
        this.originalPool = {};
        this.index = {};
        this.emojis = {};
        this.emoticons = {};

        this.buildIndex();
    }

    buildIndex() {
        for (let emoji in this.data.emojis) {
            let emojiData = this.data.emojis[emoji],
                { short_names, emoticons } = emojiData,
                id = short_names[0];

            if (emoticons) {
                emoticons.forEach(emoticon => {
                    if (this.emoticons[emoticon]) {
                        return;
                    }

                    this.emoticons[emoticon] = id;
                });
            }

            this.emojis[id] = getSanitizedData(id, null, null, this.data);
            this.originalPool[id] = emojiData;
        }
    }

    search(value, { maxResults } = {}) {
        maxResults || (maxResults = 50);
        var results = [],
            pool = this.originalPool;

        if (value.length) {
            if (value == '-' || value == '-1') {
                return [this.emojis['-1']];
            }

            if (value == '+' || value == '+1') {
                return [this.emojis['+1']];
            }

            if (results.length === 0) {
                for (let key in pool) {
                    if (key.indexOf(value) > -1) {
                        results.push(this.emojis[key]);
                    }
                }
            }

            if (results && results.length > maxResults) {
                results = results.slice(0, maxResults);
            }

            return results;
        }
    }
}
