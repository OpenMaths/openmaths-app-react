export enum Side {top = 1, right = 2, bottom = 3, left = 4}

export function touchesWindowBoundaries(rect:ClientRect, x:number, y:number):Side {
    let side:Side;

    if (x < 32)
        side = Side.left;
    else if (y < 32)
        side = Side.top;
    else if (x > (rect.width - 32))
        side = Side.right;
    else if (y > (rect.height - 32))
        side = Side.bottom;
    else
        side = null;

    return side;
}