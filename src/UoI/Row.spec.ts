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

import Row from './Row'
import Column from './Column'

describe('Row component', () => {
    it('should parse its input correctly', () => {
        const input = {
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
        };

        const RowComponent = new Row('c', input['c']);

        expect(RowComponent.id).toEqual('c');

        expect(RowComponent.children.length).toBe(3);

        _.forEach(RowComponent.children, child => {
            expect(child instanceof Column).toBe(true);
        });
    });
});