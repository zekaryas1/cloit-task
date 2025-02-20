"use client";
import CloITTree, {CloITTreeActionDataType} from "@/components/TreeComp";
import {useEffect, useState} from "react";
import CustomError from "@/components/CustomError";
import AddNodeForm from "@/components/forms/AddNodeForm";
import EditNodeForm from "@/components/forms/EditNodeForm";
import AppButton from "@/components/forms/AppButton";
import {FRONTEND_API_URL} from "@/utils/variables";
import {EMPTY_NODE_DATA, Menu as MenuModal} from "@/utils/models/menu";

export default function MenuDetail({initialTopLevelMenus}: { initialTopLevelMenus: MenuModal[] }) {
    const [formData, setFormData] = useState<{
        type: "ADD" | "EDIT";
        data: CloITTreeActionDataType;
    }>(EMPTY_NODE_DATA);

    const [error, setError] = useState<string>("");
    const [menus, setMenus] = useState<MenuModal[]>(initialTopLevelMenus);
    const [selectedMenuDetail, setSelectedMenuDetail] = useState<Partial<{ id: string, detail: MenuModal }>>({
        id: undefined,
        detail: undefined,
    });

    useEffect(() => {
        getAndShowRootMenuDetail(initialTopLevelMenus.length > 0 ? initialTopLevelMenus[0].id : undefined);
    }, [initialTopLevelMenus])

    const reloadTopLevelMenus = async () => {
        try {
            const response = await fetch(`${FRONTEND_API_URL}/api/menu/roots`);
            if (!response.ok) throw new Error("Failed to fetch top-level menus");
            const {result: rootMenus}: { result: MenuModal[] } = await response.json();
            setMenus(rootMenus);
        } catch (err) {
            console.error(err);
            setError("Error fetching top-level menus.");
        }
    };

    const getAndShowRootMenuDetail = async (rootMenuId?: string) => {
        try {
            const response = await fetch(`${FRONTEND_API_URL}/api/menu/roots/${rootMenuId}`);
            const {result} = await response.json();
            setSelectedMenuDetail({id: rootMenuId, detail: result});
        } catch (err) {
            console.error(err);
            setError("Error fetching menu details.");
        }
    };

    const handleNodeAction = async (
        method: "POST" | "PATCH" | "DELETE",
        url: string,
        body?: Record<string, unknown>
    ) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {"Content-Type": "application/json"},
                body: body?.name ? JSON.stringify(body) : undefined,
            });
            const data = await response.json();
            if (!data.success) throw new Error("Node operation failed");

            //new node added, reload the dropdown and show the tree
            if (method === "POST" && !body?.parentId) {
                reloadTopLevelMenus();
                getAndShowRootMenuDetail(data.result.id);
            } else if (method == "DELETE" && !body?.parentId) {
                //if root node deleted,
                location.reload();
            } else {
                reloadTopLevelMenus();
                getAndShowRootMenuDetail(selectedMenuDetail.id);
            }
        } catch (err) {
            console.error(err);
            setError("Node operation failed: please try again.");
        } finally {
            setFormData(EMPTY_NODE_DATA);
        }
    };

    const addNewNode = (name: string, parentId?: string) =>
        handleNodeAction("POST", `${FRONTEND_API_URL}/api/menu`, {name, parentId});

    const renameNode = (id: string, parentId: string, newName: string) =>
        handleNodeAction("PATCH", `${FRONTEND_API_URL}/api/menu/${id}`, {name: newName});

    const deleteNode = (id: string, parentId: string) =>
        handleNodeAction("DELETE", `${FRONTEND_API_URL}/api/menu/${id}`, {parentId: parentId});

    const handleNewRootMenu = () => {
        const newRootMenu = prompt("Name of new root node");
        if (newRootMenu) addNewNode(newRootMenu);
    };

    return (
        <div className="grid grid-cols-12 gap-y-8 gap-x-6">
            <div className="col-span-12 md:col-span-6 space-y-6">
                <div className="mb-8 space-y-2">
                    <p className="font-light">Menu</p>
                    <div className="flex flex-col xl:flex-row gap-1.5">
                        <select
                            name="menuItems"
                            value={selectedMenuDetail.id}
                            className="bg-gray-200 p-3 rounded-2xl min-w-full md:min-w-80 xl:min-w-96 border-e-[16px]"
                            onChange={(event) => getAndShowRootMenuDetail(event.target.value)}
                        >
                            {menus.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <AppButton
                            variant="WhiteOutlined"
                            type="button"
                            label="New"
                            onClick={handleNewRootMenu}
                        />
                    </div>
                </div>

                {selectedMenuDetail.detail ? (
                    <CloITTree
                        data={selectedMenuDetail.detail}
                        onAddBottomClick={(node) => setFormData({type: "ADD", data: node})}
                        onEditNodeClick={(node) => setFormData({type: "EDIT", data: node})}
                    />
                ) : (
                    "Please select a root menu or create a new one"
                )}
            </div>

            <div className="col-span-12 md:col-span-6 space-y-3" key={formData.data.id}>
                <CustomError error={error}/>
                {formData.type === "ADD" ? (
                    <AddNodeForm data={formData.data} onAdd={addNewNode}/>
                ) : (
                    <EditNodeForm data={formData.data} onDelete={deleteNode} onEdit={renameNode}/>
                )}
            </div>
        </div>
    );
}
