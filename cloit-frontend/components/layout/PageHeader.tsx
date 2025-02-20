import Image from "next/image";

interface PageHeaderProps {
    name: string
}

export default function PageHeader(props: PageHeaderProps) {
    const {name} = props;

    return <div className="flex items-center gap-4 mb-8">
        <div className="flex w-[52px] h-[52px] rounded-full justify-center items-center bg-secondary-600">
            <Image src={"/submenu.png"}
                   alt={"open menu"} width={24} height={24}/>
        </div>
        <p className={"text-3xl font-extrabold"}>{name}</p>
    </div>
}