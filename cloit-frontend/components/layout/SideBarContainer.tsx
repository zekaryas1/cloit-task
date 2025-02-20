export default function SideBarContainer(props: { sideBarHandlerState: boolean, children: React.ReactNode }) {
    const {children, sideBarHandlerState} = props;

    return <>
        <span className={"lg:hidden"}>
            <div
                className={`absolute h-svh z-20 w-4/5 md:w-6/12 bg-primary-950 transition-all ease-in-out border rounded-3xl p-5 pt-8 text-gray-600 ${sideBarHandlerState ? "translate-x-0" : "-translate-x-full"}`}>
            {children}
            </div>
        </span>
        <span className={"hidden lg:grid lg:col-span-3 h-svh xl:col-span-2"}>
            <div
                className={`h-full bg-primary-950 border rounded-3xl p-5 pt-8 text-gray-600 ${sideBarHandlerState ? "" : ""}`}>
                {children}
            </div>
        </span>
    </>

}