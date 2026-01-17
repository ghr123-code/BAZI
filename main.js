
// Saju Calculator Web Component
class SajuCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._render();
    }

    _render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Component Styles */
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                .calculator-form {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                label {
                    font-size: 0.9rem;
                    color: var(--text-color, #dcdcdc);
                    margin-bottom: 0.5rem;
                }
                input, select {
                    padding: 0.8rem;
                    border: 1px solid #333;
                    border-radius: 5px;
                    background-color: #2a2a3e;
                    color: var(--text-color, #dcdcdc);
                    font-size: 1rem;
                }
                button {
                    grid-column: 1 / -1;
                    padding: 1rem;
                    border: none;
                    border-radius: 5px;
                    background-color: var(--accent-color, #e94560);
                    color: white;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: var(--gold-color, #ffd700);
                    color: #1a1a2e;
                }
                .result-container {
                    margin-top: 2rem;
                    padding: 2rem;
                    background-color: #1a1a2e;
                    border-radius: 8px;
                    border: 1px solid var(--secondary-color, #0f3460);
                    display: none; /* Initially hidden */
                }
                .result-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--gold-color, #ffd700);
                    margin-bottom: 1.5rem;
                    text-align: center;
                }
                .result-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    text-align: center;
                }
                .pillar {
                    padding: 1rem;
                    background-color: #2a2a3e;
                    border-radius: 5px;
                }
                .pillar-title {
                    font-size: 1rem;
                    color: var(--text-color, #dcdcdc);
                    margin-bottom: 0.5rem;
                }
                .ganji {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: var(--header-color, #ffffff);
                }
            </style>

            <div class="calculator-wrapper">
                <div class="calculator-form">
                    <div class="form-group">
                        <label for="year">생년</label>
                        <input type="number" id="year" placeholder="예: 1990" required>
                    </div>
                    <div class="form-group">
                        <label for="month">생월</label>
                        <input type="number" id="month" placeholder="예: 5" required>
                    </div>
                    <div class="form-group">
                        <label for="day">생일</label>
                        <input type="number" id="day" placeholder="예: 15" required>
                    </div>
                    <div class="form-group">
                        <label for="hour">태어난 시</label>
                        <select id="hour" required>
                            <option value="" disabled selected>시 선택</option>
                            <option value="0">23:30 ~ 01:29 (자시)</option>
                            <option value="1">01:30 ~ 03:29 (축시)</option>
                            <option value="2">03:30 ~ 05:29 (인시)</option>
                            <option value="3">05:30 ~ 07:29 (묘시)</option>
                            <option value="4">07:30 ~ 09:29 (진시)</option>
                            <option value="5">09:30 ~ 11:29 (사시)</option>
                            <option value="6">11:30 ~ 13:29 (오시)</option>
                            <option value="7">13:30 ~ 15:29 (미시)</option>
                            <option value="8">15:30 ~ 17:29 (신시)</option>
                            <option value="9">17:30 ~ 19:29 (유시)</option>
                            <option value="10">19:30 ~ 21:29 (술시)</option>
                            <option value="11">21:30 ~ 23:29 (해시)</option>
                        </select>
                    </div>
                </div>
                <button id="calculate-btn">결과 확인</button>
                <div class="result-container">
                    <h3 class="result-title">당신의 사주팔자</h3>
                    <div class="result-grid">
                        <div class="pillar">
                            <div class="pillar-title">시주(時柱)</div>
                            <div class="ganji" id="time-pillar">--</div>
                        </div>
                        <div class="pillar">
                            <div class="pillar-title">일주(日柱)</div>
                            <div class="ganji" id="day-pillar">--</div>
                        </div>
                        <div class="pillar">
                            <div class="pillar-title">월주(月柱)</div>
                            <div class="ganji" id="month-pillar">--</div>
                        </div>
                        <div class="pillar">
                            <div class="pillar-title">년주(年柱)</div>
                            <div class="ganji" id="year-pillar">--</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        const btn = this.shadowRoot.querySelector('#calculate-btn');
        btn.addEventListener('click', () => this._calculateSaju());
    }

    _calculateSaju() {
        const year = this.shadowRoot.querySelector('#year').value;
        const month = this.shadowRoot.querySelector('#month').value;
        const day = this.shadowRoot.querySelector('#day').value;
        const hour = this.shadowRoot.querySelector('#hour').value;

        if (!year || !month || !day || hour === "") {
            alert("모든 정보를 정확히 입력해주세요.");
            return;
        }

        const gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
        const ji = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

        const yearPillar = gan[(year - 4) % 10] + ji[(year - 4) % 12];
        const monthPillar = gan[(month - 1) % 10] + ji[(month - 1) % 12];
        const dayPillar = gan[(day - 1) % 10] + ji[(day - 1) % 12];
        const timePillar = gan[hour % 10] + ji[hour % 12];

        this.shadowRoot.querySelector('#year-pillar').textContent = yearPillar;
        this.shadowRoot.querySelector('#month-pillar').textContent = monthPillar;
        this.shadowRoot.querySelector('#day-pillar').textContent = dayPillar;
        this.shadowRoot.querySelector('#time-pillar').textContent = timePillar;

        this.shadowRoot.querySelector('.result-container').style.display = 'block';
    }
}
customElements.define('saju-calculator', SajuCalculator);

// Love Compatibility Calculator Web Component
class LoveCompatibilityCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._render();
    }

    _render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Component Styles */
                .compat-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                .person-form { border: 1px solid #333; padding: 1.5rem; border-radius: 8px; }
                h3 { color: var(--gold-color, #ffd700); margin-top: 0; }
                .form-group { margin-bottom: 1rem; }
                label { font-size: 0.9rem; color: var(--text-color, #dcdcdc); }
                input { width: calc(100% - 1.6rem); padding: 0.8rem; border-radius: 5px; background-color: #2a2a3e; color: var(--text-color, #dcdcdc); border: 1px solid #333; }
                button { width: 100%; grid-column: 1 / -1; padding: 1rem; border: none; border-radius: 5px; background-color: var(--accent-color, #e94560); color: white; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: background-color 0.3s ease; margin-top: 1rem; }
                button:hover { background-color: var(--gold-color, #ffd700); color: #1a1a2e; }
                .result-container { display: none; margin-top: 2rem; padding: 1.5rem; background-color: #1a1a2e; border-radius: 8px; border: 1px solid var(--secondary-color, #0f3460); text-align: center; }
            </style>
            <div class="compat-grid">
                <div class="compat-wrapper">
                    <div class="person-form" id="person1">
                        <h3>첫 번째 분</h3>
                        <div class="form-group">
                            <label for="p1-year">생년</label>
                            <input type="number" id="p1-year" placeholder="예: 1990">
                        </div>
                         <div class="form-group">
                            <label for="p1-month">생월</label>
                            <input type="number" id="p1-month" placeholder="예: 5">
                        </div>
                         <div class="form-group">
                            <label for="p1-day">생일</label>
                            <input type="number" id="p1-day" placeholder="예: 15">
                        </div>
                    </div>
                    <div class="person-form" id="person2">
                        <h3>두 번째 분</h3>
                        <div class="form-group">
                            <label for="p2-year">생년</label>
                            <input type="number" id="p2-year" placeholder="예: 1992">
                        </div>
                         <div class="form-group">
                            <label for="p2-month">생월</label>
                            <input type="number" id="p2-month" placeholder="예: 10">
                        </div>
                         <div class="form-group">
                            <label for="p2-day">생일</label>
                            <input type="number" id="p2-day" placeholder="예: 25">
                        </div>
                    </div>
                </div>
                <button id="compat-btn">궁합 보기</button>
                <div class="result-container" id="compat-result">
                    <h4>궁합 결과</h4>
                    <p>두 분의 오행이 조화롭게 상생하여 서로에게 긍정적인 영향을 줍니다.</p>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#compat-btn').addEventListener('click', () => {
            // Placeholder logic
            this.shadowRoot.querySelector('#compat-result').style.display = 'block';
        });
    }
}
customElements.define('love-compatibility-calculator', LoveCompatibilityCalculator);

// Daily Fortune Viewer Web Component
class DailyFortuneViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._fortunes = {
            "쥐띠": "예상치 못한 행운이 찾아올 수 있습니다. 주변 사람들에게 베풀면 더 큰 복이 되어 돌아옵니다.",
            "소띠": "성실함이 빛을 발하는 날입니다. 꾸준히 노력해 온 일에서 좋은 성과를 얻을 수 있습니다.",
            "호랑이띠": "자신감이 넘치고 활력이 솟아나는 하루입니다. 새로운 일에 도전하기 좋은 날입니다.",
            "토끼띠": "주변 사람들과의 관계에 신경 써야 하는 날입니다. 작은 오해가 큰 다툼으로 번지지 않도록 조심하세요.",
            "용띠": "변화의 기운이 강한 날입니다. 이직이나 이사를 생각하고 있다면 긍정적인 결과가 있을 수 있습니다.",
            "뱀띠": "냉철한 판단력이 필요한 하루입니다. 감정적인 결정보다는 이성적으로 상황을 분석하는 것이 중요합니다.",
            "말띠": "활동량이 많은 만큼 얻는 것도 많은 날입니다. 망설이지 말고 적극적으로 움직이세요.",
            "양띠": "안정적인 하루가 예상됩니다. 무리한 변화보다는 현재의 상황을 유지하는 것이 좋습니다.",
            "원숭이띠": "재치와 순발력이 돋보이는 날입니다. 위기를 기회로 만들 수 있는 지혜가 발휘됩니다.",
            "닭띠": "작은 약속이라도 소중히 여겨야 신뢰를 얻을 수 있습니다. 약속 시간을 잘 지키는 것이 중요합니다.",
            "개띠": "책임감이 강해지는 날입니다. 맡은 바 임무를 완수하여 주변의 인정을 받게 됩니다.",
            "돼지띠": "금전운이 좋은 날입니다. 생각지 못한 수입이 생기거나 좋은 투자 기회를 만날 수 있습니다."
        };
        this._render();
    }

    _render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Component Styles */
                .fortune-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
                .fortune-item { background-color: #2a2a3e; padding: 1.5rem; border-radius: 8px; border-left: 5px solid var(--accent-color, #e94560); }
                h3 { margin: 0 0 0.5rem 0; color: var(--gold-color, #ffd700); }
                p { margin: 0; color: var(--text-color, #dcdcdc); }
            </style>
            <div class="fortune-grid" id="fortune-container">
                <!-- Fortunes will be populated here -->
            </div>
        `;
    }

    connectedCallback() {
        this._populateFortunes();
        // Date picker integration can be added here
        const datePicker = document.querySelector('#fortune-date');
        if (datePicker) {
            datePicker.addEventListener('change', (event) => {
                // You can add logic to change fortunes based on the date
                // For now, it just re-populates the same ones
                console.log('Date changed to:', event.target.value);
                this._populateFortunes(); 
            });
            // Set default date to today
            datePicker.valueAsDate = new Date();
        }
    }

    _populateFortunes() {
        const container = this.shadowRoot.querySelector('#fortune-container');
        container.innerHTML = ''; // Clear existing fortunes
        for (const [zodiac, fortune] of Object.entries(this._fortunes)) {
            const item = document.createElement('div');
            item.className = 'fortune-item';
            item.innerHTML = `<h3>${zodiac}</h3><p>${fortune}</p>`;
            container.appendChild(item);
        }
    }
}
customElements.define('daily-fortune-viewer', DailyFortuneViewer);


// --- Navigation Toggle for Mobile --- //
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('header nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});
