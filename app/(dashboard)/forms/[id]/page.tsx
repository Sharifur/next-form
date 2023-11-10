
import { GetFormById, GetFormWithSumissions } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import { StatsCard } from "../../page";
import {LuView} from "react-icons/lu";
import {FaEdit, FaWpforms} from "react-icons/fa";
import {BiRightArrowAlt} from "react-icons/bi";
import {HiCursorClick} from "react-icons/hi";
import {TbArrowBounce} from "react-icons/tb";
import { ElementsType, FromElementInstance } from "@/components/FormElements";

interface BuilderProps {
    params: {id: string}
}

const FormDetailsPage = async({params} : BuilderProps) => {
    const {id} = params;

    const form = await GetFormById(Number(params.id));

    if(!form){
        throw new Error("form not found");
    }

    const {visit, submissions} = form;
    let submissionRate = 0;
    if(visit > 0){
        submissionRate = (submissions / visit) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return ( 
       <>
        <div className="py-10 border-b border-muted">
            <div className="flex justify-between container">
                <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                <VisitBtn shareUrl={form.shareUrl} />
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">
                    <FormLinkShare shareUrl={form.shareUrl} />
                </div>
            </div>
        </div>
        <div className="container w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total visits"
                icon={<LuView className="text-blue-600" />}
                helperText="All time form visits"
                value={visit.toLocaleString() || ""}
                loading={false}
                className="shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Total submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="All time form submissions"
                value={submissions.toLocaleString() || ""}
                loading={false}
                className="shadow-md shadow-yellow-600"
            />
             <StatsCard
                title="Submission rate"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="visits that result in a form submission"
                value={submissionRate.toLocaleString() +"%" || ""}
                loading={false}
                className="shadow-md shadow-green-600"
            />
             <StatsCard
                title="Bounce rate"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="visits leaves without interacting"
                value={bounceRate.toLocaleString()+"%" || ""}
                loading={false}
                className="shadow-md shadow-red-600"
            />
        </div>

        <div className="container pt-10">
            <SubmissionsTable id={form.id} />
        </div>
       </>
     );
}

async function SubmissionsTable({id} : {id: number}){
    const form = await GetFormWithSumissions(id);
    if(!form){
        throw new Error("form not found");
    }

    const formElements = JSON.parse(form.content) as FromElementInstance[]

    const columns:{
        id: string;
        label: string;
        require: boolean;
        type: ElementsType
    }[] = [];

    formElements.forEach(element => {
        switch(element.type){
            case "TextField":
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label,
                    require: element.extraAttributes?.require,
                    type: element.type
                })
        }
    });
    
    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
        </>
    )
}
 
export default FormDetailsPage;