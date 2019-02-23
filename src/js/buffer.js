class GuitarBuffer {
    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
        this.iteration = 0;
        this.progressBar = document.querySelector('.progress');
    }

    loadSound(url, index) {
        const request = new XMLHttpRequest();
        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        const thisBuffer = this;
        request.onload = () => {
            // Safari doesn't support promise based syntax
            thisBuffer.context
                .decodeAudioData(request.response, (buffer) => {
                    thisBuffer.buffer[index] = buffer;
                    thisBuffer.updateProgress(thisBuffer.urls.length);
                    if (index === thisBuffer.urls.length - 1) {
                        GuitarBuffer.finishLoading();
                        this.context.resume();
                    }
                });
        };
        request.send();
    }

    getBuffer() {
        this.urls.forEach((url, index) => {
            this.loadSound(url, index);
        });
    }

    updateProgress(total) {
        this.iteration = this.iteration + 1;
        this.progressBar.style.width = `${this.iteration / total * 100}%`;
    }

    static finishLoading() {
        document.querySelector('.loading').style.opacity = '0';
        document.querySelector('.loading').style.height = '0';
        document.querySelector('.notes').style.height = 'auto';
        document.querySelector('.notes').style.opacity = '1';
    }

    getSound(index) {
        return this.buffer[index];
    }
}

export default GuitarBuffer;
