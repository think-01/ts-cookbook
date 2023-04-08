import { Parser } from "../parser";
import { charParser } from "./char-parser";
import { allOfParser } from "./all-of-parser";

const literalParser = (pattern: string): Parser => allOfParser(
    pattern
        .split('')
        .map(letter => charParser(letter))
)

export { literalParser }
