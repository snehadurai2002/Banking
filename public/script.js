document.getElementById('create-account-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const accountNumber = document.getElementById('account-number').value;
  const name = document.getElementById('name').value;

  const response = await fetch('/api/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accountNumber, name }),
  });

  const data = await response.json();
  alert('Account Created: ' + JSON.stringify(data));
});

document.getElementById('deposit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const accountNumber = document.getElementById('deposit-account-number').value;
  const amount = parseFloat(document.getElementById('deposit-amount').value);

  const response = await fetch(`/api/accounts/${accountNumber}/deposit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();
  alert('Deposit Successful: ' + JSON.stringify(data));
});

document.getElementById('withdraw-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const accountNumber = document.getElementById('withdraw-account-number').value;
  const amount = parseFloat(document.getElementById('withdraw-amount').value);

  const response = await fetch(`/api/accounts/${accountNumber}/withdraw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  const data = await response.json();
  alert('Withdrawal Successful: ' + JSON.stringify(data));
});

document.getElementById('view-account-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const accountNumber = document.getElementById('view-account-number').value;

  const response = await fetch(`/api/accounts/${accountNumber}`);
  const data = await response.json();

  const accountDetailsDiv = document.getElementById('account-details');
  accountDetailsDiv.innerHTML = `
    <p><strong>Account Number:</strong> ${data.accountNumber}</p>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Balance:</strong> ${data.balance}</p>
	<p><strong>_id:</strong> ${data._id}</p>
  `;
});
