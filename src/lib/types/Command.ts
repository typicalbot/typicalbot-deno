import { Message } from '../../../deps.ts';

export interface Command {
    name: string;
    execute?: (message: Message) => Promise<string>;
}