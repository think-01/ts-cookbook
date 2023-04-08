import { parserExecutor } from './parser'
import { literalParser } from "./parsers/literal-parser";
import { digitsParser, regexParser, spacesParser } from "./parsers/regex-parser";
import { allOfParser } from "./parsers/all-of-parser";
import { anyOfParser } from "./parsers/any-of-parser";
import { charParser } from "./parsers/char-parser";

const monthsParser = anyOfParser(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    .map(m => literalParser(m))
)

const isAdult = (year: string) => {
    const birthYear = parseInt(year)
    const currentYear: number =  new Date().getFullYear()
    return currentYear - birthYear >= 18
}

const longYearParser = anyOfParser([
    regexParser(/20\d\d/, isAdult),
    regexParser(/19\d\d/),
])

// Mon DD, YYYY
const dateParser = allOfParser([
    monthsParser,
    spacesParser('+'),
    digitsParser(2),
    charParser(','),
    spacesParser('*'),
    longYearParser
])

const executor = parserExecutor("Sep 17, 1972").run(dateParser)

if (executor.status) console.log("Stream parsed")
else console.error(`Parsing error at "${executor.remaining}"`)
