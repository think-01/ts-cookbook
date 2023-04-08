import {parserExecutor, Parser, ParserExecutor} from "../parser";

const anyOfParser = (parsers: Parser[]): Parser => stream => {
    const executor = parserExecutor(stream)

    const satisfied: ParserExecutor = parsers.map((p: Parser) => executor.run(p)).find(evaluated => evaluated.status)

    if(satisfied) {
        return [satisfied.status, satisfied.remaining]
    }

    return [false, stream]
}

export { anyOfParser }
