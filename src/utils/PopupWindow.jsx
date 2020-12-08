export default class Popup{

    constructor(...args){
        this.window = window.open(...args);
        this.promise = new Promise((resolve, reject) => {
            this.interval = setInterval(() => {
                try{
                    if(!this.window || this.window.closed !== false) {
                        reject();
                        return this.close();
                    };

                    let queries = new URLSearchParams(this.window.location.search);
                    let code = queries.get('code');
                    if(code){
                        this.close();
                        resolve(code);
                    };
                }catch(e){};
            }, 500)
        });
    };

    close(){
        this.window.clearInterval(this.interval);
        this.window.close();
    };

    proceed(){
        this.close();
    };

    static open(...args){
        return new Popup(...args);
    };

};