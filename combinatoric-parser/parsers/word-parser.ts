import {newStreamParser, Parser, runParsers} from "../parser";
import {charParser} from "./char-parser";

const wordParser = (pattern: string): Parser => stream => {
    const run = runParsers(newStreamParser(stream))
    const charParsers = pattern.split('').map(letter => charParser(letter))
    const result = run(charParsers)

    return [result.status, result.remaining]
}

export { wordParser }
