
import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
// import { useParams } from "next/navigation";

interface BuilderProps {
    params: {id: string}
}

const Builder = async({params} : BuilderProps) => {
    const {id} = params;

    const form = await GetFormById(Number(params.id));

    if(!form){
        throw new Error("form not found");
    }

    return ( 
       <FormBuilder form={form} />
     );
}
 
export default Builder;