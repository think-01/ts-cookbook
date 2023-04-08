type Parser = (stream: string) => [boolean, string]

type ParserExecutor = {
    run: (fn: Parser) => ParserExecutor
    remaining: string,
    status: boolean
}

const bypass = (stream: string): ParserExecutor => {
    return {
        run: (fn: Parser) => bypass(stream),
        remaining: stream,
        status: false
    }
}

const parserExecutor = (stream: string): ParserExecutor => {
    return {
        run: (fn: Parser) => {
            let [advance, remainingStream] = fn(stream)
            if (advance) {
                return parserExecutor(remainingStream)
            } else {
                return bypass(stream)
            }
        },
        remaining: stream,
        status: true
    }
}

export { Parser, parserExecutor, ParserExecutor }
