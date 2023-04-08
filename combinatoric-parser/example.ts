import { newStreamParser, runParsers } from './parser'
import { charParser } from "./parsers/char-parser";
import {wordParser} from "./parsers/word-parser";

let streamParser = newStreamParser("Ala ma kota")

streamParser = runParsers(streamParser)([
    wordParser("Ala"),
    charParser(" "),
    wordParser("nie")
])


if (streamParser.status) console.log("Stream parsed")
else console.error(`Parsing error at "${streamParser.remaining}"`)
