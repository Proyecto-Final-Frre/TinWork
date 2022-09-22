import React from "react";

import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    CardHeader,
    FormFeedback,
  } from "reactstrap";

import { Formik} from "formik";

function FormUser() {
    return (
      <Container className="p-5">
        <Card>
          <CardHeader></CardHeader>
          <CardBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                bio: "",
              }}
              validate={(values) => {
                const errors = {};
  
                // We need a name
                if (!values.name) errors.name = "Required";
  
                // We need a valid e-mail
                if (!values.email) errors.email = "Required";
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                  errors.email = "Invalid email address";
  
                // We need a valid password
                if (!values.password) errors.password = "Required";
                else if (`${values.password}`.length < 7)
                  errors.password =
                    "Password must be larger than 7 characters";
  
                console.log({ values, errors });
  
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
  
                  setSubmitting(false);
                }, 250);
              }}
            >
              {(props) => {
                const {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* y otras más */
                } = props;
                return (
                  <Form onSubmit={handleSubmit}>
                    <h1>Form</h1>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Woody Allen"
                        invalid={errors.name && touched.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="contoso@domain.com"
                        invalid={errors.email && touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Provide a password"
                        invalid={errors.password && touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <FormFeedback>{errors.password}</FormFeedback>
                    </FormGroup>
                   
  
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? `Loading` : `Submit`}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </Container>
    );
  }

export default FormUser;
