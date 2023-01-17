const { cresteRoot } = ReactDOM

function app() {
    return<>
    <h1>hola CSR</h1>
    
    <ul>
        <li style={{ color: 'gold' }}>gold</li>
        <li style={{ color: 'cyan' }}>cyan</li>
        <li style={{ color: 'magenta' }}>magenta</li>
    </ul>
    </>
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)