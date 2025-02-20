"use client";

import Tree, {Arrow, treeHandlers, useTreeState} from "react-hyper-tree";
import {DefaultNodeProps} from "react-hyper-tree/dist/types";
import Image from "next/image";
import {TreeNode} from "react-hyper-tree/dist/helpers/node";
import AppButton from "@/components/forms/AppButton";
import {Menu} from "@/utils/models/menu";

export type CloITTreeActionDataType = {
    id: string;
    name: string;
    depth: number;
    parent: {
        id: string;
        name: string;
    };
};

interface CloITTreeProps {
    data?: Menu
    onAddBottomClick: (data: CloITTreeActionDataType) => void;
    onEditNodeClick: (data: CloITTreeActionDataType) => void;
}

type ClickActionType = "EDIT" | "DELETE" | "ADD";

type ClickAction = {
    type: ClickActionType;
    node: TreeNode;
};

type CustomNodeProps = DefaultNodeProps & {
    onClickCallBack: (action: ClickAction) => void;
};

export default function CloITTree(props: CloITTreeProps) {
    const {onAddBottomClick, onEditNodeClick, data} = props;

    const treeNodeClickHandler = ({type, node}: ClickAction) => {
        const nodeData = {
            id: node.data.id,
            name: node.data.name,
            depth: 1,
            parent: {
                id: node.options.parent?.data.id,
                name: node.options.parent?.data.name,
            },
        };

        if (type == "EDIT") {
            onEditNodeClick(nodeData);
        } else if (type == "ADD") {
            onAddBottomClick(nodeData);
        }
    };

    const {required, handlers} = useTreeState({
        data,
        id: "CloITTree_id",
        defaultOpened: true,
    });

    return (
        <>
            <div className={"space-x-2"}>
                <AppButton
                    variant={"Primary"}
                    type={"button"}
                    label={"Expand all"}
                    onClick={() => {
                        //const treeIds =
                        const rootId =
                            treeHandlers.trees["CloITTree_id"].instance.data[0].id;
                        treeHandlers.trees["CloITTree_id"].handlers.setOpen(rootId);
                    }}
                />

                <AppButton
                    variant={"WhiteOutlined"}
                    type={"button"}
                    label={"Collapse all"}
                    onClick={() => {
                        const rootId =
                            treeHandlers.trees["CloITTree_id"].instance.data[0].id;
                        treeHandlers.trees["CloITTree_id"].handlers.setOpen(rootId);

                        //Edit - works
                        //handlers.getNode(25)?.setData({
                        //    name: "System code: Edited"
                        //})
                        //treeHandlers.trees["CloITTree_id"].handlers.rerender();

                        //ADD - Node
                        // treeHandlers.trees["CloITTree_id"].handlers.setRawChildren(25, [
                        //     {
                        //         id: 251,
                        //         name: "New 25 data"
                        //     }
                        // ])
                        // treeHandlers.trees["CloITTree_id"].handlers.rerender();

                        //Delete - WIP
                        //const nodeData = treeHandlers.trees["CloITTree_id"].handlers.getNode(25);
                        //const {id} = nodeData.options.parent;
                        //handlers.getNode(id)?.removeChild(nodeData);
                        //treeHandlers.trees["CloITTree_id"].handlers.rerender();
                    }}
                />
            </div>
            <Tree
                {...required}
                {...handlers}
                horizontalLineStyles={{
                    stroke: "slategray",
                    strokeWidth: 1,
                    strokeDasharray: "0 0",
                }}
                verticalLineStyles={{
                    stroke: "slategray",
                    strokeWidth: 1,
                    strokeDasharray: "0 0",
                }}
                renderNode={(defaultProps) => {
                    return (
                        <CustomNode
                            {...defaultProps}
                            onClickCallBack={treeNodeClickHandler}
                        />
                    );
                }}
            />
        </>
    );
}

const CustomNode = (props: CustomNodeProps) => {
    const {onClickCallBack, node, onToggle} = props;

    const icons = [
        {
            image: "/plus icon.png",
            type: "ADD",
        },
        {
            image: "/edit icon.png",
            type: "EDIT",
        },
    ];

    return (
        <div className={"flex items-center gap-2 py-2 cursor-pointer"}>
            {(node.hasChildren() || node.options.async) && !node.isLoading() && (
                <Arrow
                    //@ts-expect-error type error on onClick
                    onClick={onToggle}
                    opened={node.isOpened() && !!node.hasChildren()}
                />
            )}
            <div className={"group flex items-center gap-2"}>
                <span onClick={() => {
                    onClickCallBack({
                        type: "EDIT",
                        node: node
                    })
                }}>{node.data.name}</span>
                <div className="hidden group-hover:flex gap-2">
                    {icons.map((icon) => {
                        return (
                            <div
                                key={icon.image}
                                className="flex justify-center items-center bg-secondary-600 rounded-full w-7 h-7 p-2"
                                onClick={() => {
                                    onClickCallBack({
                                        type: icon.type as ClickActionType,
                                        node: node,
                                    });
                                }}
                            >
                                <Image
                                    src={icon.image}
                                    alt={"action icon"}
                                    height={20}
                                    width={20}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
