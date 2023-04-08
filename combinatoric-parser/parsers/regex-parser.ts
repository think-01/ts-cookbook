import {Parser} from "../parser";

type Validator = ((stream: string) => boolean) | null

const regexParser = (regex: RegExp, validator: Validator = null): Parser => stream => {
    const flags = regex.ignoreCase ? 'i' : ''
    const sanitizedRegex = new RegExp(regex.source.replace(/^\^?(.*)(\.\*)?$/, '^($1)(.*)'), flags)
    let result

    if ( (result = sanitizedRegex.exec(stream)) !== null) {
        const [all, match, remaining] = result
        if(validator !== null && !validator(match)) {
            return [false, all]
        }

        return [true, remaining]
    }

    return [false, stream]
}

type Repetitions = number | '*' | '+' | '?' | '' | [number, number]

const makeRepeated = (regExSource: string, repetitions: Repetitions) => {
    if (typeof repetitions !== 'number') {
        if (Array.isArray(repetitions)) {
            return `${regExSource}{${repetitions[0],repetitions[1]}}`
        }

        return `${regExSource}${repetitions}`
    }

    return `${regExSource}{${repetitions}}`
}


const lettersParser = (r: Repetitions = '') => regexParser(new RegExp(makeRepeated('[a-zA-Z]',r )))
const digitsParser = (r: Repetitions = '') => regexParser(new RegExp(makeRepeated('\\d', r)))
const spacesParser = (r: Repetitions = '') => regexParser(new RegExp(makeRepeated('\\s', r)))
const wordParser = (r: Repetitions = '') => regexParser(new RegExp(makeRepeated('\\w', r)))

export { regexParser, lettersParser, digitsParser, spacesParser, wordParser }
