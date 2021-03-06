import { equiv } from "@thi.ng/equiv";
import { Attribs, IHiccupShape, Type } from "@thi.ng/geom-api";
import { copyAttribs } from "../internal/copy-attribs";

export class Group implements IHiccupShape {
    children: IHiccupShape[];
    attribs: Attribs;

    constructor(attribs: Attribs, children?: IHiccupShape[]) {
        this.attribs = attribs;
        this.children = children || [];
    }

    get type() {
        return Type.GROUP;
    }

    *[Symbol.iterator]() {
        yield* this.children;
    }

    copy(): Group {
        return new Group(
            copyAttribs(this),
            <IHiccupShape[]>this.children.map((c) => c.copy())
        );
    }

    equiv(o: any) {
        return o instanceof Group && equiv(this.children, o.children);
    }

    toHiccup() {
        return ["g", this.attribs, ...this.children.map((x) => x.toHiccup())];
    }
}
