class SajuCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._render();
    }

    _render() {
        this.shadowRoot.innerHTML = `
            <style>
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
                    grid-column: 1 / -1; /* Span all columns */
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
        // In a real application, you would use a proper library for accurate Manse-ryeok calculations.
        // This is a simplified placeholder.
        const year = this.shadowRoot.querySelector('#year').value;
        const month = this.shadowRoot.querySelector('#month').value;
        const day = this.shadowRoot.querySelector('#day').value;
        const hour = this.shadowRoot.querySelector('#hour').value;

        if (!year || !month || !day || hour === "") {
            alert("모든 정보를 정확히 입력해주세요.");
            return;
        }

        // --- Placeholder Logic --- //
        const gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
        const ji = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

        const yearPillar = gan[(year - 4) % 10] + ji[(year - 4) % 12];
        const monthPillar = gan[(month - 1) % 10] + ji[(month - 1) % 12]; // Simplified
        const dayPillar = gan[(day - 1) % 10] + ji[(day - 1) % 12];     // Simplified
        const timePillar = gan[hour % 10] + ji[hour % 12];           // Simplified
        // --- End Placeholder --- //

        this.shadowRoot.querySelector('#year-pillar').textContent = yearPillar;
        this.shadowRoot.querySelector('#month-pillar').textContent = monthPillar;
        this.shadowRoot.querySelector('#day-pillar').textContent = dayPillar;
        this.shadowRoot.querySelector('#time-pillar').textContent = timePillar;

        const resultContainer = this.shadowRoot.querySelector('.result-container');
        resultContainer.style.display = 'block';
    }
}

customElements.define('saju-calculator', SajuCalculator);
