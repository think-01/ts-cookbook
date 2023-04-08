## simple state machine in a functional way

### install and run example

`npm i && ts-node state-machine/example.js`

### usage
to instantiate your machine you need to deine its states and transistions as unions:
```typescript
type States = 'A' | 'B' | 'C'
type Transistions = 'AB' | 'BA' | 'BC' | 'CA'
```
then using those unions describe transistion graph - note that transistions can point to states itself or to tuples of state and function to be executed on transistion:
```typescript
// define your machine
const machineDefinition : StateMachineDefinition<States, Transistions> = {
    A: {
        AB: ["B", () => console.log('A -> B')]
    },
    B: {
        BA: ["A", () => console.log('B -> A')],
        BC: "C"
    },
    C: {
        CA: "A"
    }
}
```
once your machine is defined you simply compile it set initial state and use in a functional way as follows
```typescript
// compile your machine ans ste initial state
let machine = compileMachine<States, Transistions>(machineDefinition)('A')

// change states
machine = machine('AB')
machine = machine('BA')
machine = machine('AB')
```
note that machine definition and a state are completelly immutable so once instantiated your machine is locked for any changes - it can only operate according to its definition
