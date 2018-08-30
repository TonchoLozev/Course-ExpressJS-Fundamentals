const messages = [
    'hello',
    'how are you',
    'nice to meet you'
];

function dataHandler(req, res) {
    if(req.path.startsWith('/data/')){
        const target = req.path.substr(6);

        if(target === 'messages'){
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(messages));
            res.end();
        }else{
            return true;
        }
    }else{
        return true;
    }
}

module.exports = dataHandler;