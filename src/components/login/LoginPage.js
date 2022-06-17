import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled, { createGlobalStyle } from 'styled-components'
import { authenticationService } from '../_services';
import Header from '../header/Header'
import Footer from '../header/Footer'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background: linear-gradient(150deg, #003152 50%, #6995C1 100%);
    margin: 0;
    min-height: 100%;
  }
`

const Container = styled.div`
	padding: 0px;
	display: flex;
	flex-direction: column;
	height: 100%;
`

const LoginPage = (props) => {
    // redirije a / si esta logueado
    if (authenticationService.currentUserValue) { 
        props.history.push('/');
    }

    return (
      <Container>
		<GlobalStyle />
			<Header />
			<div  className="fullLogin">
				<div className="smallLogin">
					<h2>Login</h2>
		            <Formik 
		                initialValues={{
		                    username: '',
		                    password: ''
		                }}
		                validationSchema={Yup.object().shape({
		                    username: Yup.string().required('Campo requerido'),
		                    password: Yup.string().required('Campo requerido')
		                })}
		                onSubmit={({ username, password, status }, { setStatus, setSubmitting }) => {
		                    setStatus();
		                    authenticationService.login(username, password)
		                        .then(
		                            user => {
		                                const { from } = props.location.state || { from: { pathname: "/" } };
		                                props.history.push(from);
		                            },
		                            error => {
		                                setSubmitting(false);
		                                setStatus("Usuario o contrase\u00F1a invalido");
		                            }
		                        );
		                }}
		                render={({ errors, status, touched, isSubmitting }) => (
		                    <Form>
		                        <div className="form-group">
		                            <label htmlFor="username">Usuario</label>
		                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
		                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
		                        </div>
		                        <div className="form-group">
		                            <label htmlFor="password">Contrase&ntilde;a</label>
		                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
		                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
		                        </div>
		                        <div className="form-group">
		                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
		                            {isSubmitting &&
		                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
		                            }
		                        </div>
		                        {status &&
		                            <div className={'alert alert-danger'}>{status}</div>
		                        }
		                    </Form>
		                )}
		            />
				</div>
			</div>
		<Footer className="full" />
    </Container>
    )
}

export { LoginPage }; 