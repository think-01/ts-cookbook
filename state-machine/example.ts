import { compileMachine, StateMachineDefinition } from './sm'

type States = 'A' | 'B' | 'C'
type Transistions = 'AB' | 'BA' | 'BC' | 'CA'

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

let machine = compileMachine<States, Transistions>(machineDefinition)('A')

machine = machine('AB')
machine = machine('BA')
machine = machine('AB')
