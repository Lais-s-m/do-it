import { Container, Content } from './styles';
import Button from '../../components/Button';
import { Redirect, useHistory } from 'react-router-dom';

function Home ({ authenticated }) {

    const history = useHistory();

    const handleNavigation = (path) => {
        return history.push(path);
    };

    if (authenticated){
        return <Redirect to='/dashboard'/>;
      }

    return (
        <Container>
            <Content>
                <h1> do<span>.</span>it </h1>
                <span> Get organized easily and effectively </span>
                <div>
                    <Button onClick={()=> handleNavigation('/signup')} whiteSchema> Register </Button>
                    <Button onClick={()=> handleNavigation('/login')}> Login </Button>
                </div>
            </Content>
        </Container>
    )
}

export default Home;