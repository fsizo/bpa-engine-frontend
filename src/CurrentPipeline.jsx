import axios from "axios"
import { useEffect, useState } from "react"
import PipelinePreview from './PipelinePreview'
import { Label } from '@fluentui/react/lib/Label';


export default function Stages(props) {

    const [stages, setStages] = useState([])

    useEffect(() => {
        try {
            axios.get('/api/config').then(value => setStages(value.data.stages))
        } catch (err) {
            console.log(err)
        }

    }, [])


    return (
        <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
            <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xxLarge.fontFamily, fontSize: props.theme.fonts.xxLarge.fontSize }}>Pipeline Preview:</Label>
            <PipelinePreview stages={stages} />
        </div>
    )
}