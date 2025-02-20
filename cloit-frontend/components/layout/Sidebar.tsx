"use client"
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import PageHeader from "@/components/layout/PageHeader";
import {useState} from "react";
import SideBarContainer from "@/components/layout/SideBarContainer";
import SideBarNavigationContent from "@/components/layout/SideBarNavigationContent";


export interface SideBarMenuItemsType {
    title: string,
    selected?: boolean,
    sub?: SideBarMenuItemsType[]
}

export default function Sidebar(props: { children: React.ReactNode }) {
    const [openSideBar, setSideBar] = useState(false);

    const sideBarMenu: SideBarMenuItemsType[] = [
        {
            title: "System",
            selected: true,
            sub: [
                {
                    title: "System code"
                },
                {
                    title: "Properties"
                },
                {
                    title: "Menus",
                    selected: true
                },
                {
                    title: "API List"
                }
            ]
        },
        {
            title: "User & Group"
        },
        {
            title: "Competition"
        }
    ]


    return <div className="grid grid-cols-12 h-full">
        <SideBarContainer sideBarHandlerState={openSideBar}>
            <SideBarNavigationContent onHandleClick={() => {
                setSideBar(!openSideBar)
            }} sideBarMenu={sideBarMenu}
            />
        </SideBarContainer>
        <div className={"col-span-12 lg:col-span-9 xl:col-span-10 p-6 lg:p-8 h-svh overflow-x-scroll"}>
            <div className={"lg:hidden pb-6"} onClick={() => {
                setSideBar(!openSideBar)
            }}>
                <Image src={"/menu close icon.png"} alt={"open menu"} width={24} height={24}/>
            </div>
            <Breadcrumb paths={["Menu"]}/>
            <PageHeader name={"Menu"}/>
            {props.children}
        </div>
    </div>
}



