import { newParserExecutor } from './parser'
import { literalParser } from "./parsers/literal-parser";
import {digitsParser, regexParser, spacesParser} from "./parsers/regex-parser";
import { streamParser } from "./parsers/stream-parser";
import {anyOfParser} from "./parsers/any-of-parser";
import {charParser} from "./parsers/char-parser";

const monthsParser = anyOfParser(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    .map(m => literalParser(m))
)

const longYearParser = regexParser(/[12][09]\d\d/)

// Mon DD, YYYY
const dateParser = streamParser([
    monthsParser,
    spacesParser('+'),
    digitsParser(2),
    charParser(','),
    spacesParser('*'),
    longYearParser
])

const executor = newParserExecutor("Jan 01, 2010").run(dateParser)

if (executor.status) console.log("Stream parsed")
else console.error(`Parsing error at "${executor.remaining}"`)
