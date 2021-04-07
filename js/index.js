function tick(){
    const element = (
        <div>
            <h1>hello world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    )
    ReactDOM.render(
        element,
        document.getElementById('app')
    )
}
setInterval(tick,1000)