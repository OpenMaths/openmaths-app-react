import * as _ from 'lodash'
import Row from './Row'

export default class Grid {
    id:string;
    children:Row[];

    constructor(input) {
        if (!input || !_.isObject(input) || _.isArray(input))
            throw new TypeError('The input of Grid needs to be a valid Object');

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Grid can only have one key, e.g. be of format {key: {...rows}}');

        this.id = _.first(keys).toString();

        const rowsInput = input[this.id];

        if (!rowsInput || !_.isObject(rowsInput) || _.isArray(rowsInput))
            throw new TypeError('The input for instantiating Grid\'s rows needs to be a valid Object');

        if (_.keys(rowsInput).length < 1)
            throw new RangeError('The input for instantiating Grid\'s rows needs to consist of at least 1 valid object');

        this.children = _.map(rowsInput, (input, id) => new Row(id, input));
    }
}