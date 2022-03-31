import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardDetails
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';

export default function OptionCard(props) {

    const previewProps = {
        previewImages: [
            {
                previewImageSrc: props.option.image,
                imageFit: ImageFit.contain,

            },
        ],
    };

    return (
        // <div id={props.option.name + "_optioncard"} onClick={()=>props.onClickHandler(props.option)} style={{ height: "320px", width: "263px", margin: "20px", borderStyle: "solid", border }}>
        //     <img src={props.option.image} alt="top" style={{height:"153px",width:"260px", backgroundColor:"rgb(240,240,240)"}}/>
        //     <div style={{padding : "10px"}}>
        //         <Label>{props.option.label}</Label>
        //     </div>
        // </div>

        <DocumentCard
            style={{ margin: "20px", }}
            onClick={() => props.onClickHandler(props.option)}
        >
            <DocumentCardPreview {...previewProps} />

            <DocumentCardTitle
                title={props.option.label}
            />


            <div style={{ margin: "15px" }}>
                <DocumentCardDetails >These are some details</DocumentCardDetails>

            </div>

        </DocumentCard>


    )
}