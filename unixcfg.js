module.exports.gast_generate = (code) => {
    let buffer = ""

    let state = 0;
    let ast = {}

    let tree = {}

    let key_array = []

    let pos = 0

    let data = "";

    for (let i = 0; i < code.length ; ++ i) {
        if (code[i] == ' ' && state == 0) {
            key_array.push(buffer.trim())
            state = 1;
            buffer = "";
        } else if (code[i] == ' ' && state == 1) {
            key_array.push(buffer.trim())
            buffer = "";
        } else if (code[i] == '"' && state == 1) {
            state = 999
        } else if (code[i] == '"' && state == 999) {
            state = 1;
        } else if (code[i] == '{' && state == 1) {
            if (buffer.length>0) key_array.push(buffer.trim())

            state = 777
            buffer = "";
        } else if (code[i] == '}' && state == 777) {
            ast["key_array"] = key_array.filter(function(str) {
                return /\S/.test(str);
            });

            data = buffer.trim()
            ast["data"] = data;
            tree[pos] = ast;
            
            pos += 1

            buffer = "";
            ast = {}
            state = 0
            key_array = []
        }
        else {
            buffer += code[i]
        }
    }

    return tree
}

