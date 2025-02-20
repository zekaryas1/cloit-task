import Image from "next/image";
import {SideBarMenuItemsType} from "@/components/layout/Sidebar";

interface SideBarNavigationContentPropType {
    onHandleClick: () => void
    sideBarMenu: SideBarMenuItemsType[]
}

export default function SideBarNavigationContent(props: SideBarNavigationContentPropType) {
    const {sideBarMenu, onHandleClick} = props

    return <>
        <div className="flex justify-between mb-12 px-4">
            <Image src={"/cloit logo.png"} alt={"cloit logo"} width={70} height={40}/>
            <Image src={"/menu open icon.png"} alt={"open menu"} width={24} height={24} onClick={() => {
                onHandleClick()
            }}/>
        </div>
        <div>
            <nav>
                <ul>
                    {
                        sideBarMenu.map(item => {
                            return <NavigationListItem key={item.title} item={item}/>
                        })
                    }
                </ul>
            </nav>
        </div>
    </>
}

function NavigationListItem({item}: { item: SideBarMenuItemsType }) {
    return <li key={item.title}
               className={`rounded-2xl ${item.selected ? 'bg-[#1D2939]' : ''}`}>
        <div
            className={`flex gap-4 p-4`}>
            <Image src={item.selected ? "/folder open.png" : "/folder close.png"}
                   alt={"open menu"} width={24} height={24}/>
            <p className={item.selected ? "text-white font-bold" : ""}>{item.title}</p>
        </div>
        {
            (item.selected && item.sub || []).map(it2 => {
                return <div key={it2.title}
                            className={`flex gap-4 p-4 ${it2.selected ? "bg-[#9FF443] text-black font-bold rounded-2xl" : ''}`}>
                    <Image src={"/menu icon.png"} alt={"open menu"} width={24}
                           height={24}/>
                    <p className={"font-bold"}>{it2.title}</p>
                </div>
            })
        }
    </li>;
}