export const EMPTY_NODE_DATA = {
    type: "ADD",
    data: {
        id: "",
        name: "",
        depth: 0,
        parent: {
            id: "",
            name: "default parent name",
        },
    },
} as const;

export interface Menu {
    id: string;
    name: string;
    parentId: string;
}