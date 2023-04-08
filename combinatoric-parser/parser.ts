import {charParser} from "./parsers/char-parser";

type Parser = (stream: string) => [boolean, string]

type StreamParser = {
    run: (fn: Parser) => StreamParser
    remaining: string,
    status: boolean
}

const bypass = (stream: string): StreamParser => {
    return {
        run: (fn: Parser) => bypass(stream),
        remaining: stream,
        status: false
    }
}

const newStreamParser = (stream: string): StreamParser => {
    return {
        run: (fn: Parser) => {
            let [advance, remainingStream] = fn(stream)
            if (advance) {
                return newStreamParser(remainingStream)
            } else {
                return bypass(stream)
            }
        },
        remaining: stream,
        status: true
    }
}

export { Parser, newStreamParser, StreamParser }
