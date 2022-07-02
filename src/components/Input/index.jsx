import React, {useState} from 'react';
import { Container, InputContainer } from './styles';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Input ({ label, icon: Icon, register, name, error = '', password=false,  ...rest }) {

    const eye = (src) => <FontAwesomeIcon icon={src} />;

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    return (
        <Container>
            <div>{label} {!!error && <span> - {error} </span> }</div>
            <InputContainer isErrored={!!error}>
                {Icon && <Icon size={20} />}
                {password ? 
                (<>
                <input
                    {...register(name)} {...rest}
                    type={passwordShown ? "text" : "password"}
                />
                <i onClick={togglePasswordVisiblity}>
                {passwordShown ?
                eye(faEye) : 
                eye(faEyeSlash)}
                </i>
                </>)
                :
                (<input {...register(name)} {...rest}/>)}
            </InputContainer>
        </Container>
    )
}

export default Input;