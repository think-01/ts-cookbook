type Validator = ((stream: string) => boolean) | undefined
type Parser = (stream: string, validator?: Validator) => [boolean, string]

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
            const [success, remainingStream] = fn(stream)
            if (success) {
                return parserExecutor(remainingStream)
            } else {
                return bypass(remainingStream)
            }
        },
        remaining: stream,
        status: true
    }
}

export { Parser, Validator, parserExecutor, ParserExecutor }
