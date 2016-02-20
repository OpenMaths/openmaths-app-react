// @SAMPLE url structure

//{a:{
//    b:{
//        d:"content_id_a",
//        e:null
//    },
//    c:{
//        f:null,
//        g:{
//            i:{
//                j:{
//                    k:"content_id_b"
//                }
//            }
//        },
//        h:null
//    }
//}}


import * as _ from 'lodash'
import expect = require('expect.js')

import Grid from './Grid'
import Row from './Row'
import Column from './Column'
import UoI from './UoI'

describe('Column component', () => {
    it('should parse its input correctly', () => {
        const input = {
            g: 'content_identifier'
        };

        const ColumnComponent = new Column('g', input['g']);

        expect(ColumnComponent.id).to.equal('g');

        expect(ColumnComponent.child instanceof UoI).to.be(true);
    });

    it('should parse its recurring input correctly', () => {
        const input = {
            g: {
                i: {
                    j: {
                        k: "content_id_b"
                    }
                }
            }
        };

        const ColumnComponent = new Column('g', input['g']);

        expect(ColumnComponent.id).to.equal('g');

        expect(ColumnComponent.child instanceof Grid).to.be(true);
    });
});