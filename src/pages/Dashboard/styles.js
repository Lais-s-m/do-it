import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;

`

export const InputContainer = styled.form`
    flex: 1;
    justify-content: center;
    margin: 32px 10px 0px 10px;
    

    section {
        display: flex;
        > div {
            flex: 1;
            margin-right: 5px;  
        }

        button {
            max-width: 260px;
            height: 60px;
            margin: 0;
        }
    }
`

export const TasksContainer = styled.div`
    padding: 0 38px;
    margin-top: 32px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    div {
        margin-top: 16px;
        margin-right: 30px;
    }
`

export const LogoutContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100vw;

    button {
        margin-right: 15px;
        width: 20vw;
        max-width: 120px;
    }
`