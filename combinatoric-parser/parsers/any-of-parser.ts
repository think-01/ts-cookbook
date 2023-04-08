import { newParserExecutor, Parser } from "../parser";

const anyOfParser = (parsers: Parser[]): Parser => stream => {
    const streamParser = newParserExecutor(stream)

    const satisfied: Parser | null = parsers.find((p: Parser) => streamParser.run(p).status)

    if(satisfied !== null) {
        const result = streamParser.run(satisfied)
        return [result.status, result.remaining]
    }

    return [false, stream]
}

export { anyOfParser }
