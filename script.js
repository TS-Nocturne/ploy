document.addEventListener('DOMContentLoaded', () => {

    // --- ฟังก์ชันเปิดกล่องของขวัญถูกลบออกจากตรงนี้แล้ว ---

    // --- Logic การ์ดลากได้ ---
    class DraggablePaper {
        constructor(paper) {
            this.paper = paper;
            this.isHolding = false;
            this.startX = 0;
            this.startY = 0;
            
            this.init();
            this.randomizePosition();
        }

        init() {
            // Mouse Events
            this.paper.addEventListener('mousedown', (e) => this.onStart(e));
            document.addEventListener('mousemove', (e) => this.onMove(e));
            document.addEventListener('mouseup', () => this.onEnd());

            // Touch Events
            this.paper.addEventListener('touchstart', (e) => this.onStart(e));
            document.addEventListener('touchmove', (e) => this.onMove(e));
            document.addEventListener('touchend', () => this.onEnd());
        }

        onStart(e) {
            this.isHolding = true;
            this.paper.style.zIndex = 1000;
            this.paper.style.transition = 'none';

            const event = e.touches ? e.touches[0] : e;
            this.startX = event.clientX - this.paper.offsetLeft;
            this.startY = event.clientY - this.paper.offsetTop;
        }

        onMove(e) {
            if (!this.isHolding) return;
            e.preventDefault();

            const event = e.touches ? e.touches[0] : e;
            const currentX = event.clientX - this.startX;
            const currentY = event.clientY - this.startY;

            this.paper.style.left = `${currentX}px`;
            this.paper.style.top = `${currentY}px`;
        }

        onEnd() {
            this.isHolding = false;
            this.paper.style.zIndex = Math.floor(Math.random() * 10);
            this.paper.style.transition = 'transform 0.2s, box-shadow 0.2s';
        }
        
        randomizePosition() {
            const container = document.querySelector('.paper-container');
            const containerRect = container.getBoundingClientRect();
            
            const randomX = Math.random() * (containerRect.width - this.paper.offsetWidth);
            const randomY = Math.random() * (containerRect.height - this.paper.offsetHeight);
            const randomRot = Math.random() * 40 - 20;

            this.paper.style.left = `${randomX}px`;
            this.paper.style.top = `${randomY}px`;
            this.paper.style.transform = `rotate(${randomRot}deg)`;
            this.paper.style.zIndex = Math.floor(Math.random() * 10);
        }
    }

    const papers = document.querySelectorAll('.paper');
    papers.forEach(paper => new DraggablePaper(paper));
});