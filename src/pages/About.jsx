
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
const About = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <h4>עלי</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>על האתר</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p></p>
                </Col>
            </Row>
            <Row>
                <Col>
                    האתר משתמש בספריות הבאות
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup dir='ltr'>
                        <ListGroup.Item>React</ListGroup.Item>
                        <ListGroup.Item>React Router Dom</ListGroup.Item>
                        <ListGroup.Item>Bootstrap</ListGroup.Item>
                        <ListGroup.Item>React-Bootstrap</ListGroup.Item>
                        <ListGroup.Item>React-Pdf</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default About;