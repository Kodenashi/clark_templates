const templateDropdown = document.getElementById('templateDropdown');
const templateSelectorEl = document.getElementById('templateSelector');
const TEMPLATE_IDS = ['leadershipEscalation','lblModification','obcxCallback','refundRequest'];

function hideAllTemplates() {
  TEMPLATE_IDS.forEach(id => document.getElementById(id).classList.add('hidden'));
}

function openTemplateById(id) {
  hideAllTemplates();
  templateSelectorEl.classList.add('hidden');
  document.getElementById(id).classList.remove('hidden');
}

function returnToSelector() {
  hideAllTemplates();
  templateSelectorEl.classList.remove('hidden');
  if (templateDropdown) templateDropdown.value = '';
}

if (templateDropdown) {
  templateDropdown.addEventListener('change', e => {
    const id = e.target.value;
    if (id) openTemplateById(id);
  });
}

/* Issue Form */
const form = document.getElementById('issueForm');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copyBtn');
const resetBtn = document.getElementById('resetBtn');

function updatePreview() {
  const formData = new FormData(form);
  const text = `
* Account details:
- Name: ${formData.get('name') || ""}
- Phone number: ${formData.get('phone') || ""}
- Domain name or preview link: ${formData.get('domain') || ""}
- I-Case: ${formData.get('icase') || ""}

* Issue summary:
${formData.get('issueSummary') || ""}

* Expectations set with the client:
- Expected resolution: ${formData.get('expectedResolution') || ""}
- Alt Solutions Provided: ${formData.get('providedSolutions') || ""}

* Next steps:
${formData.get('nextSteps') || ""}
  `.trim();
  preview.textContent = text;
}

form.addEventListener('input', updatePreview);

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(preview.textContent).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => copyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

resetBtn.addEventListener('click', () => {
  form.reset();
  preview.textContent = "";
  updatePreview();
});

updatePreview();

/* LBL Change Request */
const lblForm = document.getElementById('lblForm');
const lblPreview = document.getElementById('lblPreview');
const lblCopyBtn = document.getElementById('lblCopyBtn');
const lblResetBtn = document.getElementById('lblResetBtn');
const addChangeBtn = document.getElementById('addChangeBtn');
const changeRequestsDiv = document.getElementById('changeRequests');

let changeCount = 1;

function createChangeField(number) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('change-request');
  wrapper.innerHTML = `
    <span class="change-label">Requested change ${number}:</span>
    <input type="text" name="changeRequest[]">
    <button type="button" class="remove-change btn-remove">🗑</button>
  `;
  wrapper.querySelector('.remove-change').addEventListener('click', () => {
    wrapper.remove();
    updateLblPreview();
    updateChangeLabels();
  });
  return wrapper;
}

function updateChangeLabels() {
  document.querySelectorAll('#changeRequests .change-request .change-label').forEach((label, i) => {
    label.textContent = `Requested change ${i + 1}:`;
  });
}

addChangeBtn.addEventListener('click', () => {
  changeCount++;
  changeRequestsDiv.appendChild(createChangeField(changeCount));
  updateLblPreview();
});

function updateLblPreview() {
  const formData = new FormData(lblForm);
  const changes = formData.getAll('changeRequest[]')
    .map((c, i) => `Requested change ${i+1}: ${c || ""}`)
    .join("\n");
  const text = `
CPROD: ${formData.get('cprod') || ""}
Body: ${formData.get('body') || ""}
Business name: ${formData.get('businessName') || ""}
${changes}
  `.trim();
  lblPreview.textContent = text;
}

lblForm.addEventListener('input', updateLblPreview);

lblCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(lblPreview.textContent).then(() => {
    lblCopyBtn.textContent = "✅ Copied!";
    setTimeout(() => lblCopyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

lblResetBtn.addEventListener('click', () => {
  lblForm.reset();
  lblPreview.textContent = "";
  changeRequestsDiv.innerHTML = "";
  changeRequestsDiv.appendChild(createChangeField(1));
  changeCount = 1;
  updateLblPreview();
});

changeRequestsDiv.innerHTML = "";
changeRequestsDiv.appendChild(createChangeField(1));
updateLblPreview();

/* OBCX Callback Request */
const obcxForm = document.getElementById('obcxForm');
const obcxPreview = document.getElementById('obcxPreview');
const obcxCopyBtn = document.getElementById('obcxCopyBtn');
const obcxResetBtn = document.getElementById('obcxResetBtn');

function updateOBCXPreview() {
  const formData = new FormData(obcxForm);
  const text = `
Customer name: ${formData.get('customerName') || ""}
Customer contact number: ${formData.get('customerContact') || ""}
OBCX/OB-case/Pega case number: ${formData.get('caseNumber') || ""}
OBCX agent requested: ${formData.get('agentRequested') || ""}
2-hour callback time frame: ${formData.get('callbackTime') || ""}
Brief Notes: ${formData.get('briefNotes') || ""}
`.trim();
  obcxPreview.textContent = text;
}

obcxForm.addEventListener('input', updateOBCXPreview);

obcxCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(obcxPreview.textContent).then(() => {
    obcxCopyBtn.textContent = "✅ Copied!";
    setTimeout(() => obcxCopyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

obcxResetBtn.addEventListener('click', () => {
  obcxForm.reset();
  obcxPreview.textContent = "";
  updateOBCXPreview();
});

updateOBCXPreview();

/* Refund Request */
const refundForm = document.getElementById('refundForm');
const refundPreview = document.getElementById('refundPreview');
const refundCopyBtn = document.getElementById('refundCopyBtn');
const refundResetBtn = document.getElementById('refundResetBtn');

function updateRefundPreview() {
  const formData = new FormData(refundForm);
  const text = `
URL: ${formData.get('url') || ""}
Customer Name: ${formData.get('customerName') || ""}
Reason for refund request: ${formData.get('refundReason') || ""}

Products: ${formData.get('products') || ""}
Open work-cases: ${formData.get('openCases') || ""}
  `.trim();
  refundPreview.textContent = text;
}

refundForm.addEventListener('input', updateRefundPreview);

refundCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(refundPreview.textContent).then(() => {
    refundCopyBtn.textContent = "✅ Copied!";
    setTimeout(() => refundCopyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

refundResetBtn.addEventListener('click', () => {
  refundForm.reset();
  refundPreview.textContent = "";
  updateRefundPreview();
});

updateRefundPreview();

/* Back Button Function */
function goBackToSelector() {
  document.querySelectorAll('.template').forEach(template => {
    template.classList.add('hidden');
  });
  document.getElementById('templateSelector').classList.remove('hidden');
  const dropdown = document.getElementById('templateDropdown');
  if (dropdown) dropdown.value = "";
}
document.querySelector('select').addEventListener('change', function() {
    const container = document.querySelector('.container');
    container.classList.remove('pulse');
    void container.offsetWidth; // restart animation
    container.classList.add('pulse');
});
document.querySelector('select').addEventListener('change', function() {
    const templateSection = document.querySelector('.template-content');

    // Remove animation class if already applied
    templateSection.classList.remove('template-content');
    void templateSection.offsetWidth; // Force reflow to restart animation
    templateSection.classList.add('template-content');
});
