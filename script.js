const { Component } = React;

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [
        <Item
          key={0}
          id={0}
          delItem={id => this.delItem(id)}
          title="Never give up, never surrender!"/>
      ],
      count: 0,
      currentText : ""
    }
    this.setItem = this.setItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.delItem = this.delItem.bind(this);
  }
  setItem(e) {
    let text = e.target.value;
    this.setState({currentText: text});
  }
  addItem() {
    let items = this.state.items;
    let text = this.state.currentText;
    let count = this.state.count + 1;
    if(text){
      items.push(<Item delItem={key => this.delItem(key)} id={count} key={count} title={text}/>);
      this.setState({items, count: count, currentText: ''});
    }
  }
  delItem(key){
    console.log(key)
    let items = this.state.items;
    let newItems = [];
    for(let i in items){
      if(items[i].key !== key.toString()){
        newItems.push(items[i]);
      }else{
        let newItem = <Item title={items[i].props.title} id={items[i].props.id} del={true}/>
        newItems.push(newItem);
      }
    }
    this.setState({items: newItems});
  }
  render () {
    return (
      <div className="app">
        <div className="header">
          <h1>UYEN todo</h1>
          <div className="inputCont">
            <input value={this.state.currentText} onChange={(event) => this.setItem(event)} placeholder="Add item" type="text"/>
            <button onClick={() => this.addItem()} className="addButton">+</button>
          </div>
        </div>
        <div className="bottom">
          {this.state.items}
        </div>
      </div>
    );
  }
}

class Item extends Component{
  render(){
    return(
      <div className={this.props.del ? "item delItem" : "item itemActive"}>
        <div className="itemText">
          {this.props.title}
        </div>
        <button
          className="delButton"
          onClick={() => this.props.delItem(this.props.id)}
        >
          Delete
        </button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
