
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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

type Row = {[key: string] : string} & {submitedAt: Date}

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
            case "NumberField":
            case "TextAreaField":
            case "DateField":
            case "SelectField":
            case "CheckboxField":
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label,
                    require: element.extraAttributes?.require,
                    type: element.type
                })
            default:
                break;
        }
    });
    const rows: Row[] = [];
    form.FormSubmissions.forEach((submission) => {
        const content = JSON.parse(submission.content);
        rows.push({
            ...content,
            submitedAt: submission.createdAt
        })
    })
    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map(column => (
                            <TableHead className="uppercase" key={column.id}>
                                {column.label}
                            </TableHead>
                        ))}
                        <TableHead className="text-muted-foreground text-right uppercase">
                            Submitted at
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow key={index}>
                           {
                            columns.map((column) => (
                                <RowCell
                                    key={column.id}
                                    type={column.type}
                                    value={row[column.id]}
                                />
                            ))
                           }
                           <TableCell className="text-mutedforeground text-right">
                            {formatDistance(row.submitedAt, new Date(),{
                                addSuffix: true
                            })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
 

function RowCell({type,value} : {type: ElementsType; value: string}){
    let node: ReactNode = value;
    switch(type){
        case "DateField":
            if(!value) break;
            const date = new Date(value);
            node = <Badge variant={"outline"}>{format(date,'dd/MM/yyyy')}</Badge>
            break;
        case "CheckboxField":
            const checked = value === "true";
            node = <Checkbox checked={checked} disabled/>
            break;
        default:
            break;
    }
    return (
        <TableCell>
            {node}
        </TableCell>
    )
}

export default FormDetailsPage;