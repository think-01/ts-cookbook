type Setoid<T> = {
    equals: (a:T, b:T) => boolean
}

const numericSetoid : Setoid<number> = {
    equals: (a, b) => a === b
}

const stringSetoid : Setoid<string> = {
    equals: (a, b) => a === b
}

const booleanSetoid : Setoid<boolean> = {
    equals: (a, b) => a === b
}

const typeSetoid : Setoid<any> = {
    equals: (a, b) => typeof a === typeof b
}

const objectSetoid = <T>(setoids : { [key in keyof T]: Setoid<T[key]> }) : Setoid<T> => ({
    equals: (a, b) => {
        for (let key in setoids) {
            if (!setoids[key].equals(a[key], b[key])) {
                return false
            }
        }
        return true
    }
})

type Animal = {
    name?: string,
    species: string,
    itFiles: boolean
}

const animalSetoid = objectSetoid<Animal>({
    name: typeSetoid,
    species: stringSetoid,
    itFiles: booleanSetoid
})

//console.log(animalSetoid.equals({species: "bird", itFiles: true}, {species: "bird", itFiles: true}))
//console.log(animalSetoid.equals({species: "bird", itFiles: true}, {species: "bird", itFiles: false}))
//console.log(animalSetoid.equals({species: "bird", name: "mumbo", itFiles: true}, {species: "bird", name: "jumbo", itFiles: true}))
//console.log(animalSetoid.equals({species: "bird", name: "mumbo", itFiles: true}, {species: "bird", itFiles: true}))

const arraySetoid = <T>(setoid : Setoid<T>) : Setoid<T[]> => ({
    equals: (a, b) => {
        if (a.length !== b.length) {
            return false
        }

        for (let i = 0; i < a.length; i++) {
            if (!setoid.equals(a[i], b[i])) {
                return false
            }
        }
        return true
    }
})

const numericArraySetoid = arraySetoid<number>(numericSetoid)
const stringArraySetoid = arraySetoid<string>(stringSetoid)

//console.log(numericArraySetoid.equals([1,2,3], [1,2,3])) // true
//console.log(numericArraySetoid.equals([1,2,3], [1,3,2])) // false

export { Setoid, numericSetoid, stringSetoid, booleanSetoid, typeSetoid, objectSetoid, arraySetoid }
