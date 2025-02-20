import Image from "next/image";
import React from "react";

interface BreadcrumbProps {
    paths: string[]
}

export default function Breadcrumb(props: BreadcrumbProps) {
    const {paths} = props;

    return <div className="flex gap-4 pb-8">
        <Image src={"/folder gray.png"}
               alt={"open menu"} width={24} height={24}/>
        {
            paths.map(path => {
                return <React.Fragment key={path}>
                    <div className="flex items-center justify-center">
                        <div className={"w-[0.5px] h-4/6 bg-gray-400 rotate-12"}/>
                    </div>
                    <p>{path}</p>
                </React.Fragment>
            })
        }
    </div>
}