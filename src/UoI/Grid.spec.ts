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
                            j: {
                                k: "content_id_b"
                            }
                        }
                    },
                    h: null
                }
            }
        };

        const GridComponent = new Grid(input);

        expect(GridComponent.id).toEqual('a');

        expect(GridComponent.children.length).toBe(2);

        _.forEach(GridComponent.children, (child:Row) => {
            expect(child instanceof Row).toBe(true);
        });
    });

    it('should throw an error when input is invalid', () => {
        const input = ['a', 'b'];

        expect(() => new Grid(input)).toThrow();
    });

    it('should throw an error when input has too many keys', () => {
        const input = {
            a: {},
            b: {}
        };

        expect(() => new Grid(input)).toThrow();
    });

    it('should throw an error when input for children is invalid', () => {
        const
            ErrInput1 = {
                a: null
            },
            ErrInput2 = {
                a: {}
            },
            ErrInput3 = {
                a: 'b'
            };

        expect(() => new Grid(ErrInput1)).toThrow();
        expect(() => new Grid(ErrInput2)).toThrow();
        expect(() => new Grid(ErrInput3)).toThrow();
    });
});