import React from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content, AnimationContainer } from './styles';
import { Link, useHistory } from 'react-router-dom';

import { FiMail, FiLock } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import api from '../../services/api';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router';

function Login({ authenticated, setAuthenticated }) {
    const schema = yup.object().shape({
      email: yup.string().email('Invalid email').required('Email required'),
      password: yup.string().min(8, 'Minimum of 8 digits').required('Password Required')
    })
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm ({
      resolver: yupResolver(schema)
    });
  
    const history = useHistory();
  
    const onSubmitFunction = (data) => {
      api.post("/user/login", data)
      .then((response)=> {
        const { token, user } = response.data;

        localStorage.setItem("@Doit:token", JSON.stringify(token));
        localStorage.setItem("@Doit:user", JSON.stringify(user));

        setAuthenticated(true);

        return history.push("/dashboard");
      })
      .catch((err)=> toast.error('Invalid email or password'));
    };

    if (authenticated){
      return <Redirect to='/dashboard'/>;
    }
  
    return (
      <Container>
          <Content>
              <AnimationContainer>
                  <form onSubmit={handleSubmit(onSubmitFunction)}>
                      <h1>Login</h1>
                      <Input 
                        icon={FiMail}
                        label='Email'
                        placeholder='enter your email'
                        register={register}
                        name='email'
                        error={errors.email?.message}
                        />
                      <Input 
                        icon={FiLock}
                        label='Password'
                        placeholder='enter your password'
                        type='password'
                        password = {true}
                        register={register}
                        name='password'
                        error={errors.password?.message}
                        />
                      <Button type='submit'>Continue</Button>
                      <p>
                      Do not have an account?
                      Start <Link to='/signup'>here</Link>
                      </p>
                  </form>
                  
              </AnimationContainer>
          </Content>
        <Background/>
      </Container>
    )
  }
  
  export default Login;
  