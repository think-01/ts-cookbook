import { newParserExecutor, Parser } from "../parser";

const allOfParser = (parsers: Parser[]): Parser => stream => {
    const streamParser = newParserExecutor(stream)

    const satisfied: Parser[] = parsers.filter((p: Parser) => streamParser.run(p).status)

    if(satisfied.length === parsers.length) {
        const result = streamParser.run(satisfied[0])
        return [result.status, result.remaining]
    }

    return [false, stream]
}

export { allOfParser }
