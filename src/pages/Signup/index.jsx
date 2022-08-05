import React from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content, AnimationContainer } from './styles';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { FiUser, FiMail, FiLock } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import api from '../../services/api';
import { toast } from 'react-toastify';

function Signup({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required('Name required'),
    email: yup.string().email('Invalid email').required('Email required'),
    password: yup.string().min(8, 'Minimum of 8 digits').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.').required('Password Required'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm ({
    resolver: yupResolver(schema)
  });

  const history = useHistory();

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password };

    api.post("/user/register", user)
    .then((_) => {
      toast.success('Account created successfully');
      setAuthenticated(true);
      return history.push('/login');
    })
    .catch((err) => {
      console.log(err)
      toast.error('Error creating account, try another email')});
  }

  if (authenticated){
    return <Redirect to='/dashboard'/>;
  }

  return (
    <Container>
        <Background/>
        <Content>
            <AnimationContainer>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <h1>Register</h1>
                    <Input 
                      icon={FiUser}
                      label='Name'
                      placeholder='your name'
                      register={register}
                      name='name'
                      error={errors.name?.message}
                      />
                    <Input 
                      icon={FiMail}
                      label='Email'
                      placeholder='your email'
                      register={register}
                      name='email'
                      error={errors.email?.message}
                      />
                    <Input 
                      icon={FiLock}
                      label='password'
                      placeholder='enter a password'
                      type='password'
                      password={true}
                      register={register}
                      name='password'
                      error={errors.password?.message}
                      />
                    <Input 
                      icon={FiLock}
                      label='Password Validation' placeholder='type your password again'
                      type='password'
                      password={true}
                      register={register}
                      name='passwordConfirm'
                      error={errors.passwordConfirm?.message}
                      />
                    <Button type='submit'>Continue</Button>
                    <p>
                    Do you already have an account?
                    Sign in <Link to='/login'>here</Link>
                    </p>
                </form>
                
            </AnimationContainer>
        </Content>
    </Container>
  )
}

export default Signup;
