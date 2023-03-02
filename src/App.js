import * as React from 'react';

// MUI imports
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FormControlLabel, LinearProgress, Radio, ButtonGroup, Grid, TextField as MuiTextField } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// Form imports
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { RadioGroup, TextField } from 'formik-mui';
import axios from 'axios'
import { Select } from 'formik-mui'
import MenuItem from '@mui/material/MenuItem';
// import { TimePicker } from 'formik-mui-lab';

const formSchema = Yup.object({
  reportName: Yup.string().required(),
  format: Yup.string().required(),
  email: Yup.string().email().required(),
  schedule: Yup.string().required(),
  days:Yup.string().required(),

  scheduleSpecificDay: Yup.string().nullable(),
  scheduleSpecificDayTime: Yup.string().nullable(),
})

const initialValues = {
  reportName: '',
  format: 'excel',
  email: '',
  schedule: 'noR',

  scheduleSpecificDay: null,
  scheduleSpecificDayTime: null,
};


function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleSubmit = (values, setSubmitting) => {
    axios.post('https://postman-echo.com/post', values).then((res) => alert).catch((err) => err)

    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      onClose();
    }, 3000);
  }
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "700px !important",
        },
      }}
    >
      <DialogTitle sx={{ background: "#b1b1b1" }}>Export Report</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({ submitForm, isSubmitting, values, setFieldValue, errors }) => (
          <Form style={{ padding: "24px" }}>
            {console.log(errors)}

            <Grid container spacing={2}>
              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <p>Report Name</p>
                </Grid>

                <Grid item xs={9}>
                  <Field
                    component={TextField}
                    name="reportName"
                    type="text"
                    placeholder="Report name"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <p id="format-label">Format</p>
                </Grid>

                <Grid item xs={9} sx={{ alignItems: "center" }}>
                  <Field
                    component={RadioGroup}
                    row
                    name="format"
                    aria-labelledby="format-label"
                  >
                    <FormControlLabel
                      value="excel"
                      control={<Radio disabled={isSubmitting} />}
                      label="Excel"
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value="csv"
                      control={<Radio disabled={isSubmitting} />}
                      label="CSV"
                      disabled={isSubmitting}
                    />
                  </Field>
                </Grid>
              </Grid>

              <Grid item container xs={12}>
                <Grid item xs={3}>
                  <p>E-mail to</p>
                </Grid>

                <Grid item xs={9}>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} sx={{ alignItems: "center" }}>
                <Grid item xs={3}>
                  <p id="schedule-label">Schedule</p>
                </Grid>

                <Grid item xs={9}>
                  <Field
                    component={RadioGroup}
                    row
                    name="schedule"
                    aria-labelledby="schedule-label"
                  >
                    <FormControlLabel
                      value="noR"
                      control={<Radio disabled={isSubmitting} />}
                      label="No Repeat"
                      disabled={isSubmitting}
                    />

                    <FormControlLabel
                      value="sDate"
                      control={<Radio disabled={isSubmitting} />}
                      label="Specific Date"
                      disabled={isSubmitting}
                    />

                    <FormControlLabel
                      value="daily"
                      control={<Radio disabled={isSubmitting} />}
                      label="Daily"
                      disabled={isSubmitting}
                    />

                    <FormControlLabel
                      value="weekly"
                      control={<Radio disabled={isSubmitting} />}
                      label="Weekly"
                      disabled={isSubmitting}
                    />
                  </Field>
                </Grid>
              </Grid>

              {values.schedule === "daily" && (
                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <p>Everyday at</p>
                  </Grid>

                  <Grid item xs={9}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                        onChange={(value) =>
                          setFieldValue("scheduleSpecificDayTime", value, true)
                        }
                        value={values.scheduleSpecificDayTime}
                        renderInput={(params) => (
                          <MuiTextField
                            error={Boolean(errors.scheduleSpecificDayTime)}
                            name="scheduleSpecificDayTime"
                            {...params}
                          />
                        )}
                      />
                  </LocalizationProvider>   
                  </Grid>
                </Grid>
              )}

              {values.schedule === "sDate" && (
                <Grid item container xs={12}>
                  <Grid item xs={3}>
                    <p>Date</p>
                  </Grid>

                  <Grid item xs={9} display="flex" gap={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(value) =>
                          setFieldValue("scheduleSpecificDay", value, true)
                        }
                        value={values.scheduleSpecificDay}
                        renderInput={(params) => (
                          <MuiTextField
                            error={Boolean(errors.scheduleSpecificDay)}
                            name="scheduleSpecificDay"
                            {...params}
                          />
                        )}
                      />

                      <p>at</p>

                      <TimePicker
                        onChange={(value) =>
                          setFieldValue("scheduleSpecificDayTime", value, true)
                        }
                        value={values.scheduleSpecificDayTime}
                        renderInput={(params) => (
                          <MuiTextField
                            error={Boolean(errors.scheduleSpecificDayTime)}
                            name="scheduleSpecificDayTime"
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )}
            <Grid  item container xs={12} >
              {values.schedule === "weekly" && (
                <Grid item container xs={12} >
                  <Grid item xs={3} >
                    <p>Every</p>
                  </Grid>

                  <Grid item xs={9}  display="flex" gap={2}>
                    <Grid>
                      <Field component={Select}
                             name={'days'}>
                        
                       <MenuItem value={'monday'}>Monday</MenuItem>
                       <MenuItem value={'tuesday'}>Tuesday</MenuItem>
                       <MenuItem value={'wednesday'}>Wednesday</MenuItem>
                       <MenuItem value={'thursday'}>Thursday</MenuItem>
                       <MenuItem value={'friday'}>Friday</MenuItem>
                       
                      </Field>  
                    </Grid>

                    <p>at</p>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                          onChange={(value) =>
                            setFieldValue("scheduleSpecificDayTime", value, true)
                          }
                          value={values.scheduleSpecificDayTime}
                          renderInput={(params) => (
                            <MuiTextField
                              error={Boolean(errors.scheduleSpecificDayTime)}
                              name="scheduleSpecificDayTime"
                              {...params}
                            />
                          )}
                        />
                    </LocalizationProvider>  
                  </Grid>
                </Grid>
              )}
            </Grid>
              {isSubmitting && (
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              )}

              <Grid
                gap={2}
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ButtonGroup >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    ok
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={() => onClose()}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open dialog
      </Button>

      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
