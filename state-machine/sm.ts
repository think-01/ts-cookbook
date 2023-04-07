type GenericTransistionMap<A extends string,B extends string> = { [T in B]?: A | [A, () => void]}
type StateMachineDefinition<A extends string,B extends string> = { [S in A]?: GenericTransistionMap<A,B> }

type StateMachine<S extends string, T extends string> = (transistion: T) => StateMachine<S,T>

function makeMachine<S extends string, T extends string>(machineDefinition: StateMachineDefinition<S,T>, initialState: S) : StateMachine<S,T> {
    const transistionMap = machineDefinition[initialState]

    return (transistion: T) => {
        const state = transistionMap !== undefined ? transistionMap[transistion] : initialState
        if (Array.isArray(state)) {
            const [newState, eventHandler] = state
            eventHandler()
            return makeMachine(machineDefinition, newState)
        }

        if(state === 'string') {
            return makeMachine(machineDefinition, state)
        }

        return makeMachine(machineDefinition, initialState)
    }
}

const compileMachine = <S extends string, T extends string>(machineDefinition: StateMachineDefinition<S,T>) => (initialState: S) => makeMachine<S,T>(machineDefinition, initialState)

export { compileMachine, StateMachineDefinition }
