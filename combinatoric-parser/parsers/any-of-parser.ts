import {parserExecutor, Parser, ParserExecutor} from "../parser";

const anyOfParser = (parsers: Parser[]): Parser => stream => {
    const executor = parserExecutor(stream)

    const satisfied: Parser = parsers.find((p: Parser) => {
        const [status] = p(stream)
        return status
    })

    if(satisfied) {
        const result = executor.run(satisfied)
        return [result.status, result.remaining]
    }

    return [false, stream]
}

export { anyOfParser }
