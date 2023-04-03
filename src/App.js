import React, {Component} from "react";
import ArticleBody from "./components/ArticleBody";
import ArticleActions from "./components/ArticleActions";
import Article from "./components/Article";
import  LangContext  from "./components/lang-context";

let EN = {
  description: 'Article description:',
  description_text: 'NVIDIA on Azure is bringing AI, networking, and high-performance computing to the enterprise.',
  title: 'NVIDIA news',
  news: 'NVIDIA Accelerated AI on Azure',
  btn: 'Read',
  current_lang: 'EN'
}
let UA = {
  description: 'Опис статті:',
  description_text: 'NVIDIA на Azure надає підприємствам можливості штучного інтелекту, мереж та високопродуктивних обчислень.',
  title: 'НОВИНИ NVIDIA',
  news: 'Прискорений штучний інтелект NVIDIA в Azure',
  btn: 'Читати',
  current_lang: 'UA'
}

class App extends Component{
  constructor(){
    super();
    const storedLang = localStorage.getItem('lang');
    this.state = {
      lang: storedLang === 'UA' ? UA : EN
    };
  }

  componentDidMount(){
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns[this.state.lang.current_lang === 'UA' ? 0 : 1].classList.add('active');
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.lang !== this.state.lang){
      localStorage.setItem('lang', this.state.lang.current_lang);
      const langBtns = document.querySelectorAll('.lang-btn');
      langBtns.forEach(btn => btn.classList.remove('active'));
      langBtns[this.state.lang.current_lang === 'UA' ? 0 : 1].classList.add('active');
    }
  } 

  SetLang(lang){
    this.setState({lang: lang})
  }

  render(){
    return (
      <div className="wrapper">
       <LangContext.Provider value={this.state.lang}>
         <h1 className="title">{this.state.lang.title}</h1>
          <Article lang={this.state.lang}>
          <div className="article__title">
            <h2>{this.state.lang.news}</h2>
          </div> 
          </Article>
        <div className="lang">
          <button onClick={() => this.SetLang(UA)} 
          className="lang-btn">UA</button>
          <button onClick={() => this.SetLang(EN)}
          className="lang-btn">EN</button>
        </div>
        </LangContext.Provider>
      </div> 
      )}}

export default App

