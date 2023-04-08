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

const newParserExecutor = (stream: string): ParserExecutor => {
    return {
        run: (fn: Parser) => {
            let [advance, remainingStream] = fn(stream)
            if (advance) {
                return newParserExecutor(remainingStream)
            } else {
                return bypass(stream)
            }
        },
        remaining: stream,
        status: true
    }
}

export { Parser, newParserExecutor, ParserExecutor }
