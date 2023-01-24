import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InfoIcon from '@mui/icons-material/Info';

import ReactJson from 'react-json-view';
import samplejson from './sample.json';

import "./App.css";

export default function App() {
    let [json, setJson] = React.useState(samplejson);
    let [jsonView, setJsonView] = React.useState(React.createElement(ReactJson, { src: samplejson, displayObjectSize: false, enableClipboard: false, name: false, indentWidth: 4, style: { padding: 0, margin: 0 } }));

    let onSubmit = (e) => {
        e.preventDefault();
        let jsonBlob = new Blob([JSON.stringify(json)], { type: "application/json" });
        let url = URL.createObjectURL(jsonBlob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `${json.language_name}.json`;
        a.click();
    }

    let jsonUpdater = (key, value) => {
        let oldjson = json;
        oldjson[key] = value;
        setJson(oldjson);
        setJsonView(React.createElement(ReactJson, { src: oldjson, displayObjectSize: false, enableClipboard: false, name: false, indentWidth: 4, style: { padding: 0, margin: 0 } }));
    }
    let templateUpdater = (key, subkey, value) => {
        let oldjson = json;
        oldjson.language_messages[key][subkey] = value;
        setJson(oldjson);
        setJsonView(React.createElement(ReactJson, { src: oldjson, displayObjectSize: false, enableClipboard: false, name: false, indentWidth: 4, style: { padding: 0, margin: 0 } }));
    }
    let templateAnswerUpdater = (key, subkey, subsubkey, value) => {
        let oldjson = json;
        oldjson.language_messages[key][subkey][subsubkey].answer = value;
        setJson(oldjson);
        setJsonView(React.createElement(ReactJson, { src: oldjson, displayObjectSize: false, enableClipboard: false, name: false, indentWidth: 4, style: { padding: 0, margin: 0 } }));
    }
    return (
        <>
            <Paper style={{ backgroundColor: "#075E54", padding: '0px 0px 5px 20px', position: 'fixed', width: '100%', borderRadius: 0, zIndex: 9999 }} elevation={5}>
                <Box sx={{ flexGrow: 1 }}>
                    <h2 style={{ color: "#ffffff" }}>Nirvanote Template Helper</h2>
                </Box>
            </Paper>
            <Container style={{ paddingTop: "100px" }} maxWidth="xl">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid Paper xs={7} style={{ paddingRight: '5px', paddingBottom: '20px' }}>
                            {/* {json && <ReactJson src={json} />} */}
                            {jsonView}
                        </Grid>
                        <Grid Paper xs={5} style={{ paddingLeft: '5px', paddingBottom: '35px' }}>
                            <Paper className='paper-col' elevation={3}>
                                <form onSubmit={onSubmit}>
                                    <div style={{ display: 'flex', direction: 'row' }}>
                                        <TextField label="whatsapp_language_code" style={{ flex: 9 }} variant="outlined" onChange={(e) => {
                                            jsonUpdater(e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <div style={{ flex: 1, alignSelf: 'center', marginLeft: '5px', textAlign: 'center', cursor: 'pointer' }} title="WhatsApp Supported Languages" onClick={() => {window.open("https://support.wati.io/l/en/article/8qf6ekwd88-what-are-the-supported-languages-for-template-update", "_blank")}}>
                                            <InfoIcon sx={{ color: "#075E54" }}/>
                                        </div>
                                        {/* <InfoIcon style={{ flex: 1 }} /> */}
                                    </div>
                                    <TextField label="language_name" variant="outlined" onChange={(e) => {
                                        jsonUpdater(e.target.labels[0].innerText, e.target.value);
                                    }} />
                                    <hr />
                                    <h3 style={{ textAlign: 'center' }}>Templates</h3>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>SECURITY_POLICY_MESSAGE : </p>
                                        <small>{samplejson.language_messages.SECURITY_POLICY_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("SECURITY_POLICY_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Accept" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("SECURITY_POLICY_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="Reject" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("SECURITY_POLICY_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>WELCOME_MESSAGE : </p>
                                        <small>{samplejson.language_messages.WELCOME_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("WELCOME_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="I am ready" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("WELCOME_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION1_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION1_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION1_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION1_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION1_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION2_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION2_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION2_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION2_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION2_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION3_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION3_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION3_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION3_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION3_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION4_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION4_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION4_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION4_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION4_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION5_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION5_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION5_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION5_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION5_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION6_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION6_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION6_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION6_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION6_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION7_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION7_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION7_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Yes" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION7_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="No" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION7_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>QUESTION8_MESSAGE : </p>
                                        <small>{samplejson.language_messages.QUESTION8_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("QUESTION8_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                        <p style={{ fontSize: '12px', fontWeight: '700' }}>BUTTONS : </p>
                                        <TextField label="Male" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION8_MESSAGE", "answers", 0, e.target.value);
                                        }} />
                                        <TextField label="Female" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION8_MESSAGE", "answers", 1, e.target.value);
                                        }} />
                                        <TextField label="Junior" variant="outlined" onChange={(e) => {
                                            templateAnswerUpdater("QUESTION8_MESSAGE", "answers", 2, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>THANK_YOU_MESSAGE : </p>
                                        <small>{samplejson.language_messages.THANK_YOU_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("THANK_YOU_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                    </Paper>
                                    <Paper className="lang_templates" elevation={3}>
                                        <p>INVALID_OPTION_MESSAGE : </p>
                                        <small>{samplejson.language_messages.INVALID_OPTION_MESSAGE.msg}</small>
                                        <TextField label="whatsapp_template_id" variant="outlined" onChange={(e) => {
                                            templateUpdater("INVALID_OPTION_MESSAGE", e.target.labels[0].innerText, e.target.value);
                                        }} />
                                    </Paper>
                                    <Button variant="contained" type="submit" style={{ backgroundColor: "#075E54", width: '100%', padding: '10px 10px' }}>JSON Download</Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}