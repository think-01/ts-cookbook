import {Parser} from "../parser";

const charParser = (pattern: string): Parser => stream => {
    return [stream[0] === pattern, stream.substring(1)]
}

export { charParser }
