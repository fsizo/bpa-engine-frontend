import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button } from 'react-bootstrap'
import pdf from './images/pdf.png'
import logo from './images/imagetbd.png'
import arrow from './images/arrow.png'
import OptionCard from './OptionCard';
import _ from 'lodash'

const sc = {
    "pdf": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "start"
        ],
        "outputTypes": [
            "pdf"
        ],
        "image": pdf,
        "label": "PDF Document",
        "name": "pdf",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "wav": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "start"
        ],
        "outputTypes": [
            "wav"
        ],
        "image": logo,
        "label": "WAV Document",
        "name": "wav",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "ocrService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf",
            "jpg"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Optical Character Recognition (OCR) Service",
        "name": "ocr",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "translateService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Language Translation Service",
        "name": "translate",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "formrecLayoutService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "formrecLayout"
        ],
        "image": logo,
        "label": "Form Recognizer Layout Service",
        "name": "formrecLayout",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "viewService": {
        "inputTypes": [
            "any"
        ],
        "outputTypes": [
            "any"
        ],
        "image": logo,
        "label": "Export Last Stage To DB",
        "name": "view",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "summarizeService": {
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Language Studio Text Summarization",
        "name": "summarize",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "languageNerService": {
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "languageNer"
        ],
        "image": logo,
        "label": "Language Studio Named Entity Recognition",
        "name": "languageNer",
        "bpaServiceId": "abc123",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "sttService": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "wav",
            "mp3"
        ],
        "outputTypes": [
            "text"
        ],
        "image": logo,
        "label": "Speech To Text Service",
        "name": "stt",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    }
}


export default function Stages() {

    const [serviceCatalog] = useState(sc)
    const [stages, setStages] = useState([])
    const [value, setValue] = useState(0)
    const [options, setOptions] = useState([])
    const [done, setDone] = useState(false)

    useEffect(() => {
        const getSC = async () => {
            const matchingOptions = getMatchingOptions({
                outputTypes: ["start"]
            })
            setOptions(matchingOptions)

            // const result = await axios.get('/api/serviceCatalog')
            // setServiceCatalog(result.data)
        }
        getSC()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDone = (event) => {
        setOptions([])
        setDone(true)
        axios.post('/api/config', { stages: stages.slice(1, stages.length), id: "1" })
    }

    const getMatchingOptions = (previousStage, allowAny) => {
        const _options = []
        for (const k in serviceCatalog) {
            for (const acceptedInputType of serviceCatalog[k].inputTypes) {
                if (acceptedInputType === "any" && allowAny) {
                    _options.push(serviceCatalog[k])
                    break;
                }
                if (previousStage.outputTypes.includes(acceptedInputType.toLowerCase())) {
                    _options.push(serviceCatalog[k])
                    break;
                }
            }
        }
        return _options
    }

    const onResetPipeline = () => {
        setStages([])
        const matchingOptions = getMatchingOptions({
            outputTypes: ["start"]
        })
        setOptions(matchingOptions)
    }


    const onItemClick = (event) => {
        console.log("click")
        const _stages = _.cloneDeep(stages)
        const _event = _.cloneDeep(event)
        //in the case of 'any', copy the output type of the previous stage
        if (_event.outputTypes.includes('any')) {
            _event.outputTypes = _stages[_stages.length - 1].outputTypes
            _event.inputTypes = _stages[_stages.length - 1].outputTypes
        }
        _stages.push(_event)
        setStages(_stages)

        setOptions(getMatchingOptions(_event, true))
        setValue(value + 1)
    }

    const renderOptions = () => {
        if (options) {
            return (
                <div style={{ display: "flex", padding: "30px" }} >
                    {options.map((option, index) => {
                        return (<OptionCard option={option} onClickHandler={onItemClick} />)
                    })}
                </div>
            )
        }

    }

    const renderPipeline = () => {
        if (stages) {
            return (
                <div style={{ display: "flex", padding: "30px" }} >
                    {stages.map((option, index) => {
                        console.log(`index : ${index}`)
                        if (index === stages.length - 1) {
                            return (
                                <>
                                    <OptionCard option={option} />
                                </>)
                        } else {
                            return (
                                <>
                                    <OptionCard option={option} />
                                    <img src={arrow} alt="progress indicator" />
                                </>)
                        }
                    })}
                </div>
            )
        }
    }

    const renderStage = () => {
        if (done) {
            return (<>{JSON.stringify(stages)}</>)
        }

        return (<>
            <div style={{ display: "flex" }}>
                <div style={{ flexDirection: "column" }}>
                    <h4 style={{ marginLeft: "50px", marginTop: "30px" }}>Select a stage to add it to your pipeline configuration: </h4>
                    {renderOptions(options)}
                    <h4 style={{ marginLeft: "50px" }}>Pipeline Preview: </h4>
                    {renderPipeline(stages)}
                    <Button variant="primary" onClick={onDone} style={{ marginLeft: "50px" }}>Done</Button>{' '}
                    <Button variant="primary" onClick={onResetPipeline} style={{ marginLeft: "50px" }}>Reset Pipeline</Button>{' '}
                </div>
            </div>

        </>)
    }

    return (<>
        {renderStage()}
    </>)


}