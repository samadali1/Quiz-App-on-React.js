import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Quiz from './Components/quiz.js'
import Result from './Components/result.js'
import Time from './Components/time.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      start: false,
      questions: [],
      index: 0,
      obtMarks: 0,
      totalMarks: 100,
      cAnswers : 0,
      finalResult:'',
      showResult:false,
      min: 0,
      sec:0,
      data:false,
    }
    this.startQuiz = this.startQuiz.bind(this)
    this.checkAns = this.checkAns.bind(this)
    this.parrentFinal = this.parrentFinal.bind(this)
    this.time = this.time.bind(this)
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=10').then((res) => {
      res.json().then((data) => {
        this.setState({
          questions: data.results,
          data: true
        })
      }
      )
    })
  }

  startQuiz() {
    this.setState({
      start: true,
    })
  }
  checkAns() {
    const { index } = this.state;
    this.setState({ index: index + 1 })
  }
  parrentFinal(remarks) {
    var { index, obtMarks, totalMarks,questions , cAnswers} = this.state;
    if(remarks === "correct") {
      obtMarks = obtMarks+10;
      cAnswers = cAnswers+1;
      
      this.setState({
        index: index + 1,
        obtMarks: obtMarks,
        cAnswers: cAnswers,
      })
    }
    if(remarks==="uncorrect"){
      this.setState({
        index: index + 1,
      })
    }
    if(questions.length-1===index){
      var { index, obtMarks, totalMarks,questions} = this.state;
      console.log(this.state)
      if(obtMarks>45){
        console.log("Gretaer Than 50")
        this.setState({
          index:0,
          questions:[],
          finalResult:"passed",
          showResult:true,
        })
      }
      else{
        console.log("Lesser Than 50")
        this.setState({
          index:0,
          questions:[],
          finalResult:"failed",
          showResult:true,
        })
      }
    }
  }
  time(sec,min){
    this.setState({sec,min})
  }
  render() {
    const { questions, start, index , min , sec, data} = this.state;
    return (
      <div className="App">
        <div className={"header"}><p><i style={{color:"#24286dcb"}} class="fa fa-question-circle"></i> QuizBox - <span style={{ fontSize: "15px" }}> We Check You!</span> </p><button className={'Loc'}><i class="fa fa-map-marker"></i> Pakistan</button></div>
        {!this.state.showResult && start && <Time time={this.time} />}
        {!data && <p className={'loader'}><i class="fa fa-cog fa-spin"></i><br />Loading</p>}
        {!start && data && <div className={'introCon'}><h1 style={{margin:'0px'}}><i class='fa fa-star'></i></h1><h1 style={{color:"#00817A"}}>Check Your Intelligence!</h1><hr /><p style={{color:"white"}}>We are QuizBox an online quiz application. We check people's intelligence with our quiz exams. Everyone can give our intelligence exam and get certified from us.</p><button onClick={this.startQuiz} className={"startBtn"}><i class="fa fa-rocket"></i> Get Started!</button></div>}
        {questions.length && start && <Quiz category={questions[index].category} dificulty={questions[index].difficulty} type={questions[index].type} question={questions[index].question} qNo={index + 1} incorrect={questions[index].incorrect_answers} correct={questions[index].correct_answer} checkAns={this.checkAns} parrentFinal={this.parrentFinal} />}
        {this.state.showResult && <Result result={this.state.finalResult} obtMarks={this.state.obtMarks} cAnswers={this.state.cAnswers} timeTaken={{min,sec}} />}
      </div>
    );
  }
}


export default App;
