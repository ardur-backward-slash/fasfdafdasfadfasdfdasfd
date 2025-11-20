const milestones = [
  { id: 1, title: "Alpha product design complete", status: "completed", date: "2025-06-01" },
  { id: 2, title: "Beta release & feedback", status: "in-progress", date: "2025-08-15" },
  { id: 3, title: "Public launch prep", status: "pending", date: "2025-11-01" },
  { id: 4, title: "Global launch", status: "pending", date: "2026-01-10" }
];

let signups = 1423;
let referrals = 287;

function renderStats() {
  document.getElementById('signups-count').textContent = signups.toLocaleString();
  document.getElementById('referrals-count').textContent = referrals.toLocaleString();
  document.getElementById('milestones-count').textContent = milestones.length;
}

function calcProgress() {
  const completed = milestones.filter(m => m.status === 'completed').length;
  return Math.round((completed / milestones.length) * 100);
}

function renderProgress() {
  const pct = calcProgress();
  document.getElementById('progress-percent').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';
}

function renderMilestones() {
  const container = document.getElementById('milestone-list');
  container.innerHTML = '';
  milestones.forEach(m => {
    const el = document.createElement('div');
    el.className = `milestone ${m.status}`;
    el.innerHTML = `
      <div class="left">
        <div class="dot">${m.status === 'completed' ? '✓' : m.id}</div>
        <div>
          <div style="font-weight:700;color:#fff">${m.title}</div>
          <div style="font-size:12px;opacity:0.85">${m.date} • ${m.status.replace('-', ' ')}</div>
        </div>
      </div>
      <div style="font-size:12px;opacity:0.9">
        ${m.status === 'completed' ? 'Done' : m.status === 'in-progress' ? 'In progress' : 'Upcoming'}
      </div>
    `;
    container.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderProgress();
  renderMilestones();

  document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (!email) return alert('Please enter a valid email.');
    signups++;
    renderStats();
    e.target.reset();
    alert('Thanks — you are on the waitlist!');
  });

  const toggle = document.getElementById('toggle-referral');
  const refSec = document.getElementById('referral-section');

  toggle.addEventListener('click', () => {
    refSec.classList.toggle('hidden');
    toggle.textContent = refSec.classList.contains('hidden')
      ? 'Refer Friends for Early Access'
      : 'Close Referral Form';
  });

  document.getElementById('referral-form').addEventListener('submit', e => {
    e.preventDefault();
    referrals++;
    renderStats();
    e.target.reset();
    alert('Referral sent — thanks!');
  });
});
