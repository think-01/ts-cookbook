import { newParserExecutor, Parser, ParserExecutor } from "../parser";

const checkParsers = (parser: ParserExecutor) => (parsers: Parser[]) => parsers.reduce(
    (parser, p: Parser) => parser.run(p),
    parser)

const streamParser = (parsers: Parser[]): Parser => stream => {
    const result = checkParsers(newParserExecutor(stream))(parsers)
    return [result.status, result.remaining]
}

export { streamParser }
