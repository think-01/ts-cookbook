import { Parser } from "../parser";
import { charParser } from "./char-parser";
import { streamParser } from "./stream-parser";

const literalParser = (pattern: string): Parser => streamParser(
    pattern
        .split('')
        .map(letter => charParser(letter))
)

export { literalParser }
