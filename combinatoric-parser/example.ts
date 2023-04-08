import { newStreamParser } from './parser'
import { literalParser } from "./parsers/literal-parser";
import { regexParser, wordParser } from "./parsers/regex-parser";
import { allOfParser } from "./parsers/all-of-parser";
import {anyOfParser} from "./parsers/any-of-parser";

let streamParser = newStreamParser("Ala ma kota")

const parser1 = allOfParser([
    wordParser(3),
    regexParser(/^[ma\s]{4}/),
    literalParser("kota"),
])

const parser2 = allOfParser([
    wordParser(3),
    regexParser(/^[ma\s]{4}/),
    literalParser("psa"),
])

const parser = anyOfParser([parser1, parser2])

streamParser = streamParser.run(parser)

if (streamParser.status) console.log("Stream parsed")
else console.error(`Parsing error at "${streamParser.remaining}"`)
