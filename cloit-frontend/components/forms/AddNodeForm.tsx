import {CloITTreeActionDataType} from "@/components/TreeComp";
import AppInput from "@/components/forms/AppInput";
import AppButton from "@/components/forms/AppButton";

type AddNodeFormPropType = {
    data: CloITTreeActionDataType,
    onAdd: (name: string, parentId: string) => void
}

export default function AddNodeForm(props: AddNodeFormPropType) {
    const {data, onAdd} = props;

    const addNodeFormAction = (formData: FormData) => {
        const name = formData.get("name");
        if (name && data.id){
            onAdd(name as string, data.id);
        }
    }

    return <form action={addNodeFormAction} className={"space-y-6"}>

        <AppInput value={data.depth} placeholder={"Depth"} name={"depth"} label={"Depth"} isDisabled={true}
                  className={"md:max-w-xl"}/>

        <AppInput value={data.name} placeholder={"Parent Data"} name={"parentName"} label={"Parent Data"}
                  isDisabled={true}/>

        <AppInput value={""} placeholder={"Name"} name={"name"} label={"Name"} isFocused={true} isRequired={true}/>


        <AppButton variant={"Secondary"} type={"submit"} label={"Save"} className={"min-w-72"}/>

    </form>
}