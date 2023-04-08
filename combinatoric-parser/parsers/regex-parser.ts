import {Parser} from "../parser";

const regexParser = (regex: RegExp): Parser => stream => {
    const flags = regex.ignoreCase ? 'i' : ''
    const sanitizedRegex = new RegExp(regex.source.replace(/^\^?(.*)(\.\*)?$/, '^($1)(.*)'), flags)
    let result

    if ( (result = sanitizedRegex.exec(stream)) !== null) {
        return [true, result.length > 1 ? result[2] : '']
    }

    return [false, stream]
}

type Repetitions = number | '+' | '?' | '' | [number, number]

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
