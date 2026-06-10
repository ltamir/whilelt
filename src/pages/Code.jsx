import { useState } from 'react'
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
// import { usePDF } from 'react-to-pdf'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import '../css/code.css'
import GenericModal from '../components/GenericModal'

Font.register({
    family: 'Noto Sans Hebrew',
    fonts: [
        {
            src: '/fonts/Noto_Sans_Hebrew/static/NotoSansHebrew-Regular.ttf'
        },
        {
            src: '/fonts/Noto_Sans_Hebrew/static/NotoSansHebrew-Bold.ttf'
        },
    ]
});
Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: '/fonts/Roboto/static/Roboto-Regular.ttf'
        },
        {
            src: '/fonts/Roboto/static/Roboto-Bold.ttf'
        },
    ]
});
Font.register({
    family: 'Google Sans Code',
    fonts: [
        {
            src: '/fonts/Google_Sans_Code/static/GoogleSansCode-Regular.ttf'
        },
        {
            src: '/fonts/Google_Sans_Code/static/GoogleSansCode-Bold.ttf'
        },
    ]
});

const dummy = `
public class Animal
    {
        private string color;   // protected string color
        private int weight;
        public Animal(string color, int weight)
        {
            this.color = color;
            this.weight = weight;
        }
        public override string ToString()
        {
            return "My color is " + this.color + "! And I weigh " + weight + " kilos!";
        }
        public string GetColor(){return this.color;}
    }
    public class Bird : Animal
    {
        private bool isFlying;
        public Bird(string color, int weight, bool isFlying) : base(color, weight)
        {
            this.isFlying = isFlying;
        }
        public void Zoo()
        {
            Console.WriteLine("Hello");
        }
        public override string ToString()
        {
            return "I'm a bird " + base.ToString();
        }
    }
    public class Parrot : Bird
    {
        private bool isTalking;

        public Parrot(string color, int weight, bool isFlying, bool isTalking) : base(color, weight, isFlying)
        {
            this.isTalking = isTalking;
        }

        public void Zoo()
        {
            Console.WriteLine("Hello");
        }
        public override string ToString()
        {
            return "I'm a parrot My color is " + this.GetColor()  ;   
        }
    }
    public class Fish : Animal
    {
        private string waterType;
        public Fish(string color, int weight, string waterType) : base(color, weight)
        {
            this.waterType = waterType;
        }
    }
    public class Snake : Animal
    {
        private int length;
        private bool isVenomous;
        public Snake(string color, int weight, int length, bool isVenemous) : base(color, weight)
        {
            this.length = length;
            this.isVenomous = isVenemous;
        }
        public override string ToString()
        {
            string s ="";
            if(isVenomous)
            {
                s = "I'm venomous";
            }
            else
            {
                s = "I'm not venemouse";
            }
            return "I'm a snake! " + s + base.ToString();
        }
    }
`
const Code = () => {
    const [code, setCode] = useState([])
    const [text, setText] = useState(dummy)
    const [comment, setComment] = useState({ commentId: null, codeId: "", codeIndex: -1, text: '' })

    const onAdd = (event) => {
        event.preventDefault();
        setCode(prev => [...prev, ...text.split("\n").map((line, i) => ({ codeId: crypto.randomUUID(), text: line, comments: [] }))])
        setText("")
    }
    const onClear = (event) => {
        setCode([]);
        setText("")
    }
    const show = (codeId, commentId) => {
        const comment = { commentId, text: '', codeId, codeIndex: -1 }
        const codeIndex = code.findIndex(c => c.codeId == codeId)
        comment.codeIndex = codeIndex;
        if (commentId) {
            const commentIndex = code[codeIndex].comments.findIndex(c => c.commentId == commentId)
            comment.text = code[codeIndex].comments[commentIndex].text
        }
        setComment(comment)
    }
    const hide = () => {
        setComment({ commentId: null, codeId: "", codeIndex: -1, text: '' })
    }
    const setCommentText = (event) => {
        setComment(prev => ({ ...prev, text: event.target.value }))
    }
    const onAddComment = () => {
        const temp = [...code];
        temp[comment.codeIndex].comments.push({ ...comment, commentId: crypto.randomUUID() })

        setCode(temp);
        hide();
    }

    const onEditComment = (codeId, commentId) => {

        const codeIndex = code.findIndex(c => c.codeId == codeId)
        const commentIndex = code[codeIndex].comments.findIndex(c => c.commentId == commentId)
        const comment = code[codeIndex].comments[commentIndex];
        setComment({ ...comment, codeIndex })
    }
    const onUpdateComment = () => {
        const codeIndex = code.findIndex(c => c.codeId == comment.codeId)
        const commentIndex = code[codeIndex].comments.findIndex(c => c.commentId == comment.commentId)
        const temp = [...code];
        temp[codeIndex].comments[commentIndex] = { ...comment }
        setCode(temp);
        hide();
    }
    const onDeleteComment = (codeId, commentId) => {

    }
    const onGeneratePDF = () => {
        if (code.length == 0) return;
        toPDF();
    }

    return (
        <Container>

            <Form onSubmit={onAdd}>
                <Form.Group controlId='code'>
                    <Form.Label>העתק לכאן את הקוד ולחץ על הוספה</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>קוד</InputGroup.Text>
                        <Form.Control as="textarea" rows={3}
                            dir={text.length == 0 ? 'rtl' : 'ltr'}
                            value={text}
                            required
                            placeholder='העתק לכאן את הקוד ולחץ על הוספה'
                            onChange={e => setText(e.target.value)} />
                    </InputGroup>
                </Form.Group>
                <Row>
                    <Col md='1'>
                        <Button type='submit'>הוספה</Button>
                    </Col>
                    <Col md='1'>
                        <Button type='button'>מחיקה</Button>
                    </Col>
                    <Col md='8'>
                    </Col>
                    <Col md='2'>
                        <Col>
                            <PDFDownloadLink document={<MyPdfDocument code={code.flatMap(e => [...e.comments.map(c => ({ ...c, type: 'comment', id: c.commentId })), { ...e, type: 'code', id: e.codeId }])} />} fileName="code.pdf">

                                {({ loading }) => (<Button type='button' disabled={loading}>
                                    {loading ? 'Loading document...' : 'הורד כ PDF'}
                                </Button>)}
                            </PDFDownloadLink>
                        </Col>
                    </Col>
                </Row>
            </Form>
            <Row>

            </Row>

            <GenericModal title={!comment.commentId ? 'ההערה חדשה' : 'עריכת הערה'} onHide={hide} show={comment.codeId != ''}>
                <Form.Group controlId='comment' >
                    <Form.Control type='text' dir='rtl'
                        onChange={setCommentText} value={comment.text} />
                    {comment.codeIndex > -1 && <Form.Text className="text-muted">{code[comment.codeIndex].text}</Form.Text>}
                    {!comment.commentId && <Button type='button' onClick={onAddComment}>הוספה</Button>}
                    {comment.commentId && <Button type='button' onClick={onUpdateComment}>עדכון</Button>}
                    <Button type='button' onClick={hide}>ביטול</Button>
                </Form.Group>
            </GenericModal>

            <div className='line-list' >
                {
                    code.flatMap(e => [...e.comments.map(c => ({ ...c, type: 'comment' })), { ...e, type: 'code' }]).map((line, i) => {
                        if (line.type == 'code') {
                            return (
                                <Line key={i} line={line} index={i} commentForm={show} />
                            )
                        } else {
                            return (
                                <Comment key={i} line={line} index={i} commentForm={show} editComment={onEditComment} deleteComment={onDeleteComment} />
                            )
                        }
                    })
                }
            </div>
        </Container>
    )
}


const Line = ({ line, index, commentForm }) => {

    return (
        <Row className='line g-0' dir='ltr' >
            <Col md="1" className='add-comment'><span title='add comment' onClick={() => commentForm(line.codeId)}>&#x2795;</span></Col>
            <Col md='auto'>
                <pre style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>{line.text}</pre>

            </Col>
        </Row>
    )
}
const Comment = ({ line, index, editComment, deleteComment }) => {
    return (
        <Row className='line g-0' dir='rtl' >
            <Col md="1" className='add-comment' style={{ right: '0px' }}>
                <span title='עריכת הערה' onClick={() => editComment(line.codeId, line.commentId)}>&#x270E;</span>
                <span title='מחיקת הערה' onClick={() => deleteComment(line.codeId, line.commentId)}>&#x1F5D1;</span>
            </Col>
            <Col md="auto"> <p style={{ marginBottom: 0 }}>{line.text}</p></Col>

        </Row>
    )
}

const styles = StyleSheet.create({
    page: { padding: 30, backgroundColor: '#ffffff', flexDirection: 'column' },
    col: {
        width: '100%',
        padding: 5
    },
    rtl: {
        direction: 'rtl',
        textAlign: 'right',
        fontFamily: 'Noto Sans Hebrew',
        fontSize: 10,
    },
    ltr: {
        direction: 'ltr',
        textAlign: 'left',
        fontWeight: 'normal',
        whiteSpace: 'pre',
        color: 'blue',
        fontFamily: 'Google Sans Code',
        fontSize: 10,
    }
});

const MyPdfDocument = ({ code }) => (
    <Document>
        <Page size="A4" style={styles.page} wrap>
            {
                code.map(cline => (
                    <View key={cline.id} style={styles.col}>
                        {cline.type == 'code' && <Text style={styles.ltr}>{cline.text.replace(/ /g, '\u00A0')}</Text>}
                        {cline.type != 'code' && <Text style={styles.rtl}>{cline.text}</Text>}

                    </View>
                ))
            }

        </Page>
    </Document>
);

export default Code