import { GetFormContentByUrl } from "@/actions/form";
import { FromElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";

type submitPageProps = {
    params : {
        formUrl : string
    }
}
const SubmitPage = async ({params} : submitPageProps) => {
    
    const form = await GetFormContentByUrl(params.formUrl);
    if(!form){
        throw new Error("form not found")
    }

    const formContent = JSON.parse(form.content) as FromElementInstance[];

    return (
       <FormSubmitComponent formUrl={params.formUrl} content={formContent} />
      );
}
 
export default SubmitPage;