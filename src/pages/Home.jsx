import { Container, Row, Col, ListGroup, Figure } from 'react-bootstrap'

const Home = () => {

    return (
        <Container>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src="homePageRound.png"
                />
                <Figure.Caption>
                    ברוכים הבאים
                </Figure.Caption>
            </Figure>
            <Row>
                <Col><h3 className="text-center">מי אני?</h3></Col>
            </Row>
            <Row>
                <Col><h2 className="text-center">הנדסאי תוכנה</h2></Col>
            </Row>
            <Row>
                <Col className="text-center fw-bold">תיכנתתי והכשרתי בלימודים ובעבודה</Col>
            </Row>
            <Row>
                <Col>עבדתי כטכנאי, איש סיסטם, QA  ומ 2008 כמפתח תוכנה</Col>
            </Row>
            <Row>
                <Col>
                    היום אני מפתח עצמאי (עוסק מורשה)
                </Col>
            </Row>
            <Row>
                <Col className="fw-bold">אוכל לעזור בפיתוח קוד או בהנחיה (לימוד) שפות תכנות וטכנולוגיות.</Col>
            </Row>
            <Stripe />
            <Row>
                <Col><h3 className="text-center">למי זה מתאים ?</h3></Col>
            </Row>

            <Row>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item>עסקים או עובדים בתחום התוכנה</ListGroup.Item>
                        <ListGroup.Item>תלמידי תיכון, מכללות מקצועיות, והלומדים במסלול הנדסאי בכל הנושאים הרשומים</ListGroup.Item>
                        <ListGroup.Item>ללומדים לתואר ראשון אוכל לעזור בקורסי שפות תכנות ואחרים, אך עדיף לשלוח את חומר הלימוד/נושאי הקורס מראש כדי לוודא</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Stripe />
            <Row>
                <Col><h3 className="text-center">הידע שלי</h3></Col>
            </Row>

            <Row>
                <Col>
                    <p>אוכל להנחות ולפתח בנושאים הבאים:</p>
                    <p>תחביר השפה, מונחה עצמים ומבני נתונים בכל השפות הרשומות, ובנוסף:</p>
                    <ListGroup variant="flush" as="ul">
                        <ListGroup.Item as="li">שפת c-sharp - טכנולוגיות: ASP.NET, Windows Forms</ListGroup.Item>
                        <ListGroup.Item as="li">שפת Java - טכנולוגיות: Spring Boot, Swing, Javafx, Android</ListGroup.Item>
                        <ListGroup.Item as="li">שפת Python - טכנולוגיות: Flask, SQL Alchemy</ListGroup.Item>
                        <ListGroup.Item as="li">שפת Java Script / Type Script ואתרים- טכנולוגיות: React, NodeJS, Express, כולל HTML ו CSS</ListGroup.Item>
                        <ListGroup.Item as="li">מסדי נתונים: MySQL, PostgreSQL, Mongo DB, Microsoft SQL Server, sqlite</ListGroup.Item>
                        <ListGroup.Item as="li">מבני נתונים - מערך, רשימה מקושרת (שרשרת חוליות), תור, מחסנית, עץ בינארי ומימושים שונים שלהם בשפות התכנות</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Stripe />
            <Row>
                <Col><h3 className="text-center">איך קובעים, מה העלות</h3></Col>
            </Row>

            <Row>
                <Col>
                    <p>כדי לקבוע שיעור אפשר להשתמש  ביומן או ליצור קשר איתי.  בפעם הראשונה כדאי ליצור קשר באמצעות המייל או וואטסאפ: 054.6369037 ולוודא שאוכל לעזור.</p>
                    <p>העלות היא<span style={{ fontWeight: 'bold' }}> 110 ₪ לשעה </span>(60 דקות).  ניתן לשלם בביט, פאיבוקס או דף תשלום תומך באשראי וגוגל/אפל פאי. עבור כל תשלום תשלח חשבונית מס-קבלה.</p>
                    <p>מתחברים לזום (אפשר גם google meet), משתפים מסך, ומתחילים </p>
                    <ListGroup variant="flush">
                        <ListGroup.Item>ללומדים, במהלך השיעור נוכל לעבור על החומר, להסביר, לענות על כל שאלה, להדגים, לתרגל ולעזור בכתיבת הקוד. אוכל לכתוב תרגילים ממוקדים לטובת התרגול וההבנה. </ListGroup.Item>
                        <ListGroup.Item>תלמידי תיכון, מכללות מקצועיות, והלומדים במסלול הנדסאי בכל הנושאים הרשומים</ListGroup.Item>
                        <ListGroup.Item>לעזרה טכנית אוכל לעזור לחקור בעיות, להציע פתרונות לדרישות ולעזור בכתיבת הקוד.</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Stripe />
            <Row>
                <Col><h3 className="text-center">מה אפשר לפתח</h3></Col>
            </Row>

            <Row>
                <Col>
                    <p>כדי לקבוע שיעור אפשר להשתמש  ביומן או ליצור קשר איתי.  בפעם הראשונה כדאי ליצור קשר באמצעות המייל או וואטסאפ: 054.6369037 ולוודא שאוכל לעזור.</p>
                    <p>העלות היא<span style={{ fontWeight: 'bold' }}> 110 ₪ לשעה </span>(60 דקות).  ניתן לשלם בביט, פאיבוקס או דף תשלום תומך באשראי וגוגל/אפל פאי. עבור כל תשלום תשלח חשבונית מס-קבלה.</p>
                    <p>מתחברים לזום (אפשר גם google meet), משתפים מסך, ומתחילים </p>
                    <ListGroup variant="flush">
                        <ListGroup.Item>יישומי מחשב - Java Swing, JavaFX, C# WinForms, Python tkinter</ListGroup.Item>
                        <ListGroup.Item>אתרים - HTML+JS+CSS, React, ASP.NET (ASPX)</ListGroup.Item>
                        <ListGroup.Item>שרתים - Java SpringBoot, Java vanilla, C# ASP.NET/Web Api, Python Flask, NodeJS (express)</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Container>
    )
}

const Stripe = () => {
    return (
        <Row className='bg-light g-0 h-20 pt-2 pb-2 mt-2 mb-2'>
            <Col></Col>
        </Row>
    )
}

export default Home;