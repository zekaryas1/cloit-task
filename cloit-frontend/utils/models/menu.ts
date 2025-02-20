export const EMPTY_NODE_DATA = {
    type: "ADD",
    data: {
        id: "",
        name: "",
        depth: 0,
        parent: {
            id: "1",
            name: "get parent name",
        },
    },
} as const;

export interface Menu {
    id: string;
    name: string;
    parentId: string;
}