import { newStreamParser, runParsers } from './parser'
import { charParser } from "./parsers/char-parser";
import { literalParser } from "./parsers/literal-parser";
import { regexParser, wordParser } from "./parsers/regex-parser";

let streamParser = newStreamParser("Ala ma kota")

streamParser = runParsers(streamParser)([
    wordParser(3),
    regexParser(/^[ma\s]{4}/),
    literalParser("kot"),
    charParser("a")
])

if (streamParser.status) console.log("Stream parsed")
else console.error(`Parsing error at "${streamParser.remaining}"`)
