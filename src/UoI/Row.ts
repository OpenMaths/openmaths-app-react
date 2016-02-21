import Column from './Column'

export default class Row {
    id:string;
    children:Column[];

    constructor(id, input) {
        if (!input || !_.isObject(input) || _.isArray(input))
            throw new TypeError('The input of Row needs to be a valid Object');

        const keys = _.keys(input);

        if (keys.length < 1)
            throw new RangeError('The input for instantiating Row\'s columns needs to consist of at least 1 valid object');

        this.id = id.toString();
        this.children = _.map(input, (input, id) => new Column(id, input));
    }
}