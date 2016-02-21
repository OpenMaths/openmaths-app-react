import * as _ from 'lodash'
import Row from './Row'

export default class Grid {
    id:string;
    children:Row[];

    constructor(input) {
        // @TODO Check for the number of children first, throw an exception if invalid
        if (!_.isObject(input))
            throw new TypeError('Input of Grid needs to be a valid Object');

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Grid can only have one key, e.g. be of format {key: {...rows}}');

        this.id = _.first(keys).toString();

        const rowsInput = input[this.id];

        if (!_.isObject(rowsInput))
            throw new TypeError('Input for instantiating Grid\'s rows needs to be a valid Object');

        if (_.keys(rowsInput).length < 1)
            throw new RangeError('Input for instantiating Grid\'s rows needs to consist of at least 1 valid object');

        this.children = _.map(input[this.id], (input, id) => new Row(id, input));
    }
}