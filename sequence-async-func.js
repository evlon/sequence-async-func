class SequenceAsyncFunc {
    constructor(fn, timeSpan) {
        this.fn = fn;
        this.timeSpan = timeSpan;
        this.queue = [];
        this.executer = false;
        let objThis = this;
        return function() {
            let args = arguments;
            let objCaller = this;

            return new Promise((resolve,reject)=>{
                objThis.queue.push({
                    obj: objCaller,
                    args,
                    resolve,
                    reject
                });
                if (!objThis.executer) {
                    objThis.exec();
                }

            }
            );
        }
    }

    async sleep(ms) {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(),this.timeSpan);
        });
    }


    async exec() {
        this.executer = true;
        try {
            while (this.queue.length > 0) {
                let item = this.queue.shift();
                try {
                    let ret = await this.fn.apply(item.obj, item.args);
                    item.resolve(ret);
                } catch (e) {
                    item.reject(e);
                } finally {
                    await this.sleep(this.timeSpan);
                }
            }
        } catch (e) {
            console.error(e);
        }
        finally {
            this.executer = false;
        }

    }
}
