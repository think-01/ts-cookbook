import { parserExecutor, Parser, ParserExecutor } from "../parser";

const checkParsers = (parser: ParserExecutor) => (parsers: Parser[]) => parsers.reduce(
    (parser, p: Parser) => parser.run(p),
    parser)

const allOfParser = (parsers: Parser[]): Parser => stream => {
    const result = checkParsers(parserExecutor(stream))(parsers)
    return [result.status, result.remaining]
}

export { allOfParser }
