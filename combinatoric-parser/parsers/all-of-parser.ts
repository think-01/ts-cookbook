import { newStreamParser, Parser, StreamParser } from "../parser";

const checkParsers = (parser: StreamParser) => (parsers: Parser[]) => parsers.reduce(
    (parser, p: Parser) => parser.run(p),
    parser)

const allOfParser = (parsers: Parser[]): Parser => stream => {
    const result = checkParsers(newStreamParser(stream))(parsers)
    return [result.status, result.remaining]
}

export { allOfParser }
