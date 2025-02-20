import {FRONTEND_API_URL} from "@/utils/variables";
import {Menu as MenuModal} from "@/utils/models/menu";
import Menu from "@/components/pages/Menu";

const getTopLevelMenus = async () => {
    try {
        const response = await fetch(`${FRONTEND_API_URL}/api/menu/roots`, {
            cache: "no-cache"
        });
        const {success, result}: { success: boolean, result: MenuModal[] } = await response.json();
        if (success) {
            return result;
        }
    } catch (error) {
        console.error(error);
    }
    return []
}

export default async function MenuPage() {
    const menus = await getTopLevelMenus();

    return <Menu initialTopLevelMenus={menus}/>

}
