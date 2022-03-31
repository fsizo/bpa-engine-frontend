import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PipelinePreview from './PipelinePreview'
import OptionCard from './OptionCard';
import _ from 'lodash'

import { sc } from './serviceCatalog'
import { PrimaryButton } from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Dropdown } from '@fluentui/react/lib/Dropdown';

import sentiment from './images/sentimentDemoLogo.svg'

const dropdownStyles = {
    dropdown: { width: 300 },
};

const languages = [
    { key: 'en', text: 'English' },
    { key: 'es', text: 'Spanish' },
    { key: 'th', text: 'Thai' },
    { key: 'fr', text: 'French' },
];


const newsc = {
    ...sc,
    "generalDocument": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "generalDocument"
        ],
        "image": sentiment,
        "label": "Form Recognizer General Document Model",
        "name": "generalDocument",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "prebuiltInvoice": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "prebuiltInvoice"
        ],
        "image": sentiment,
        "label": "Form Recognizer Prebuilt Invoice Model",
        "name": "prebuiltInvoice",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "prebuiltBusinessCard": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "prebuiltBusinessCard"
        ],
        "image": sentiment,
        "label": "Form Recognizer Prebuilt Business Card Model",
        "name": "prebuiltBusinessCard",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "prebuiltIdentity": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "prebuiltIdentity"
        ],
        "image": sentiment,
        "label": "Form Recognizer Prebuilt ID Model",
        "name": "prebuiltIdentity",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "prebuiltReceipt": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "prebuiltReceipt"
        ],
        "image": sentiment,
        "label": "Form Recognizer Receipt ID Model",
        "name": "prebuiltReceipt",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "prebuiltTaxW2": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "prebuiltTaxW2"
        ],
        "image": sentiment,
        "label": "Form Recognizer Tax-W2 ID Model",
        "name": "prebuiltTaxW2",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "customFormRec": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "pdf"
        ],
        "outputTypes": [
            "customFormRec"
        ],
        "image": sentiment,
        "label": "Form Recognizer Custom Model",
        "name": "customFormRec",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "recognizePiiEntities": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "recognizePiiEntities"
        ],
        "image": sentiment,
        "label": "Language Studio PII Model",
        "name": "recognizePiiEntities",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "extractKeyPhrases": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "extractKeyPhrases"
        ],
        "image": sentiment,
        "label": "Language Studio Key Phrases Model",
        "name": "extractKeyPhrases",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "recognizeLinkedEntities": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "recognizeLinkedEntities"
        ],
        "image": sentiment,
        "label": "Language Studio Linked Entities Model",
        "name": "recognizeLinkedEntities",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "analyzeSentiment": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "analyzeSentiment"
        ],
        "image": sentiment,
        "label": "Language Studio Sentiment Model",
        "name": "analyzeSentiment",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "recognizeCustomEntities": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "recognizeCustomEntities"
        ],
        "image": sentiment,
        "label": "Language Studio Custom NER Model",
        "name": "recognizeCustomEntities",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "singleCategoryClassify": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "singleCategoryClassify"
        ],
        "image": sentiment,
        "label": "Language Studio Classify Single Class Model",
        "name": "singleCategoryClassify",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "multiCategoryClassify": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "multiCategoryClassify"
        ],
        "image": sentiment,
        "label": "Language Studio Classify Mulitiple Classes Model",
        "name": "multiCategoryClassify",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    },
    "recognizeEntities": {
        "bpaServiceId": "abc123",
        "inputTypes": [
            "text"
        ],
        "outputTypes": [
            "recognizeEntities"
        ],
        "image": sentiment,
        "label": "Language Studio Classify Mulitiple Classes Model",
        "name": "recognizeEntities",
        "serviceSpecificConfig": {},
        "serviceSpecificConfigDefaults": {}
    }

}

export default function Stages(props) {

    const [serviceCatalog] = useState(newsc)
    const [stages, setStages] = useState([])
    const [value, setValue] = useState(0)
    const [options, setOptions] = useState([])
    const [hideTranslateDialog, setHideTranslateDialog] = useState(true)
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const [currentOption, setCurrentOption] = useState(null)


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

    const onDone = async () => {
        try{
            await axios.post('/api/config', { stages: stages.slice(1, stages.length), id: "1" })  
        } catch(err) {
            console.log(err)
        }

        props.onSelectContent({currentTarget : {id : "CURRENT_PIPELINE"}})
        setOptions([])
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

    const addItemToPipeline = (item) => {
        const _stages = _.cloneDeep(stages)
        const _event = _.cloneDeep(item)
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


    const onItemClick = (event) => {
        if (event.name === 'translate') {
            setCurrentOption(_.cloneDeep(event))
            setHideTranslateDialog(false)
        } else {
            addItemToPipeline(event)
        }

    }

    const renderOptions = () => {
        if (options) {
            return (
                <div style={{ display: "flex", flexWrap: "wrap", padding: "30px", overflow: "auto" }} >
                    {options.map((option) => {
                        return (<OptionCard option={option} onClickHandler={onItemClick} />)
                    })}
                </div>
            )
        }

    }

    const toggleHideDialog = () => {
        setHideTranslateDialog(!hideTranslateDialog)
    }

    const dialogContentProps = {
        type: DialogType.largeHeader,
        title: 'Translate To Language',
        subText: 'Select the target language to translate your documents.',
    };

    const modalProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };

    const onDialogSave = (event) => {
        console.log(event)
        const newOption = currentOption
        newOption.serviceSpecificConfig = { to: selectedLanguage }
        setHideTranslateDialog(true)
        addItemToPipeline(newOption)
    }

    const onDialogCancel = (event) => {
        setHideTranslateDialog(true)
    }

    const onTranslateDialogChange = (event) => {
        console.log(event)
        let key = null
        for (const l of languages) {
            if (l.text === event.currentTarget.textContent) {
                key = l.key
                break
            }
        }
        if (key) {
            setSelectedLanguage(key)
        }

    }

    const renderStageTop = () => {
        return (
            <>
                <Dialog
                    hidden={hideTranslateDialog}
                    onDismiss={toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    <Dropdown
                        placeholder="Select an option"
                        label="Languages"
                        options={languages}
                        styles={dropdownStyles}
                        onChange={onTranslateDialogChange}
                    />
                    <DialogFooter>
                        <PrimaryButton onClick={onDialogSave} text="Save" />
                        <PrimaryButton onClick={onDialogCancel} text="Cancel" />
                    </DialogFooter>
                </Dialog>
                <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xxLarge.fontFamily, fontSize: props.theme.fonts.xxLarge.fontSize }}>Select a stage to add it to your pipeline configuration:</Label>
                {renderOptions(options)}
            </>
        )
    }

    const renderStageBottom = () => {
        if(stages && stages.length > 0){
            return (
                <>
                    <Label theme={props.theme} style={{ fontFamily: props.theme.fonts.xxLarge.fontFamily, fontSize: props.theme.fonts.xxLarge.fontSize }}>Pipeline Preview:</Label>
                    <PipelinePreview stages={stages} />
                    <div>
                        <PrimaryButton onClick={onDone} style={{ margin: "50px" }} text="Done"></PrimaryButton>{' '}
                        <PrimaryButton onClick={onResetPipeline} text="Reset Pipeline"></PrimaryButton>{' '}
                    </div>
                </>
            )
        }
        
    }

    const renderStage = () => {
        return (
            <div style={{ paddingLeft: "10px", paddingTop: "50px" }}>
                {renderStageTop()}
                {renderStageBottom()}
            </div>
        )
    }

    return (<>
        {renderStage()}
    </>)


}