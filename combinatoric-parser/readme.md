## combinatoric parsers / validators

### install and run example

`npm i && ts-node combinatoric-parser/example.ts`

### usage
to parse your imput you need an executor and parser grammar definition
```typescript
const executor = parserExecutor("string to be parsed").run(parserGrammarDefinition)
```
once parsing is done you end up with status object point where it failed eventually
```typescript
if (executor.status) console.log("Stream parsed")
else console.error(`Parsing error at "${executor.remaining}"`)
```
parser grammar is a set of nested parsing rules of different types:

**terminal parsers:**
* charParser - awaits a specified char
* regexParser - awaits for a pattern matching input ( with additional callback validator )

**derived parsers:**
* literalParser - a sequence of charParsers
* lettersParser - a sequence of letters ( parametrised with length / * / ? / + / [min, max] )
* digitsParser - a sequence of digits ( parametrised with length / * / ? / + / [min, max] )
* spacesParser - a sequence of white characters ( parametrised with length / * / ? / + / [min, max] )

**structural parsers:**
* allOfParser - an ordered sequence of nested parsers
* anyOfParser - resolves if any of nested parsers resolve

Parsers lists can be created dynamically:
```typescript
const monthsParser = anyOfParser(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        .map(m => literalParser(m))
```
regexParser has a special second character allowing an extra validation step after basic one has passed - in the below example it validates if year of birth is for adule
```typescript
const isAdult = (year: string) => {
    const birthYear = parseInt(year)
    const currentYear: number =  new Date().getFullYear()
    return currentYear - birthYear >= 18
}

const yearOfBirth = regexParser(/\d\d\d\d/, isAdult),
```
Any combination of nested parsers can be used. Source stream is being parsed by a structure of parsers from left to right. If parsing faile then all subsquent checks are bypassed but according to functional nature of code it does not throw any exception or anything. It just continues to the end by bypass path.

### t.b.d.

* functor for collecting error data
* async parsers ( remote validating services )
