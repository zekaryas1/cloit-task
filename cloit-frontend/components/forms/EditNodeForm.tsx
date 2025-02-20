import {CloITTreeActionDataType} from "@/components/TreeComp";
import AppInput from "@/components/forms/AppInput";
import AppButton from "@/components/forms/AppButton";

type EditNodeFormPropType = {
    data: CloITTreeActionDataType,
    onDelete: (id: string, parentId: string) => void
    onEdit: (id: string, parentId: string, name: string) => void
}

export default function EditNodeForm(props: EditNodeFormPropType) {
    const {data, onDelete, onEdit} = props;

    const editFormAction = (formData: FormData) => {
        onEdit(data.id, data.parent.id, formData.get("name") as string)
    }

    const deleteFormAction = () => {
        onDelete(data.id, data.parent.id)
    }

    return <form action={editFormAction} className={"space-y-6"}>

        <AppInput value={data.id} placeholder={"Menu ID"} name={"id"} label={"Menu ID"} isDisabled={true}
                  className={"md:max-w-xl"}/>

        <AppInput value={data.depth} placeholder={"Depth"} name={"depth"} label={"Depth"} isDisabled={true}/>

        <AppInput value={data.parent.name} placeholder={"Parent Data"} name={"parentId"} label={"Parent Data"}
                  isDisabled={true}/>

        <AppInput value={data.name} placeholder={"Name"} name={"name"} label={"Name"} isFocused={true}/>

        <div className="flex gap-2 flex-wrap">
            <AppButton variant={"Secondary"} type={"submit"} label={"Rename"} className={"min-w-72"}/>

            <button formAction={deleteFormAction}
                    className={"bg-red-600 p-2 px-6 text-white rounded-3xl min-w-72"}>Delete
            </button>
        </div>

    </form>
}