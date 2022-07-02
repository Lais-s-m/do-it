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
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(8, 'Mínimo de 8 dígitos').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha deve conter no mínimo uma letra maiúscula, uma minúscula, um número e um caractere especial.').required('Senha obrigatória'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Senhas não conferem').required('Confirmar senha obrigatório'),
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
      toast.success('Conta criada com sucesso');
      setAuthenticated(true);
      return history.push('/login');
    })
    .catch((err) => {
      console.log(err)
      toast.error('Erro ao criar conta, tente outro email')});
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
                    <h1>Cadastro</h1>
                    <Input 
                      icon={FiUser}
                      label='Nome'
                      placeholder='Seu nome'
                      register={register}
                      name='name'
                      error={errors.name?.message}
                      />
                    <Input 
                      icon={FiMail}
                      label='Email'
                      placeholder='Seu melhor email'
                      register={register}
                      name='email'
                      error={errors.email?.message}
                      />
                    <Input 
                      icon={FiLock}
                      label='Senha'
                      placeholder='Uma senha bem segura'
                      type='password'
                      password={true}
                      register={register}
                      name='password'
                      error={errors.password?.message}
                      />
                    <Input 
                      icon={FiLock}
                      label='Confirmação da senha' placeholder='Confirmação da senha'
                      type='password'
                      password={true}
                      register={register}
                      name='passwordConfirm'
                      error={errors.passwordConfirm?.message}
                      />
                    <Button type='submit'>Enviar</Button>
                    <p>
                    Já tem uma conta? 
                    Faça seu <Link to='/login'>login</Link>
                    </p>
                </form>
                
            </AnimationContainer>
        </Content>
    </Container>
  )
}

export default Signup;
