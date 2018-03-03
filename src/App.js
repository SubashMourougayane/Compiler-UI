import React, { Component } from 'react';
import logo from './code.png';
import './App.css';
import ReactAce from 'react-ace-editor';
var ace;
class App extends Component {

  constructor() {
    super();
    this.state = {
      sel_language : "java",
      sel_mode : "terminal",
    }
  }
  handleChange=(e)=>{
    console.log("value changed ",e.target.value)
    this.setState({sel_language:e.target.value});
  }
  run = ()=>{
    const editor = ace.editor;
    console.log(editor.getValue());
    var code = {
      code:editor.getValue(),
    };
    console.log("data is ",code);
    var request = new Request("http://192.168.0.152:3001/"+this.state.sel_language+"/run-code",{
      method:'POST',
      headers:new Headers({'Content-Type':'application/json'}),
      body:JSON.stringify(code)
    });
    fetch(request)
    .then(function(response){
      response.json()
      .then(function(data){
        console.log(data);
        document.getElementById("output").innerHTML=data.output;

      })
      // console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }
  render() { 
   
    return (
      
      
      <div>
            <header className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to CodeWorld </h1>
            </header>
            <div className = "Selectors">
                  <select value={this.state.sel_language} onChange={this.handleChange}>
                    <option value="java">Java</option>
                      <option value="C++">C++</option>
                      <option value="c">C</option>
                      <option value="Python">Python</option>
                      <option value="JavaScript">JavaScript</option>
                  </select>
            </div>
            <div>
                    <div className="CodeEditor" style = {{float:"left",width:"40%"}}>
                        <ReactAce 
                              
                              mode={this.state.sel_language}
                              theme={this.state.sel_mode}
                              setReadOnly = {false}
                              onChange ={this.onChange}
                              style={{ height: '500px',width:'750px',fontSize:20 }}
                              ref={instance => { ace = instance; }} // Let's put things into scope
                        />
                    </div>
                    <div style = {{float:"left",width:"10%"}}>
                      <button style = {{marginTop:"150%"}} onClick={this.run}>
                        Compile & Run
                      </button>
                    </div>
                    <div style={{float:"left",border:"2px solid gray",height:"500px",width:"40%",marginTop:"50px"}}>
                      <text id="output">
                        Waiting for code...........
                      </text>
                    </div>
            </div>
        
      </div>

            
      
    );
  }
}

export default App;
