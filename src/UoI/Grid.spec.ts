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
//                j:"content_id_b"
//            }
//        },
//        h:null
//    }
//}}

import * as _ from 'lodash'
import expect = require('expect.js')

import Grid from './Grid'
import Row from './Row'

describe('Grid component', () => {
    it('should parse its input correctly', () => {
        const input = {
            a: {
                b: {
                    d: "content_id_a",
                    e: null
                },
                c: {
                    f: null,
                    g: {
                        i: {
                            j: "content_id_b"
                        }
                    },
                    h: null
                }
            }
        };

        const GridComponent = new Grid(input);

        expect(GridComponent.id).to.equal('a');

        expect(GridComponent.children.length).to.be(2);

        _.forEach(GridComponent.children, child => {
            expect(child instanceof Row).to.be(true);
        });
    });
});