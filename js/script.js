// Set today's date as default
    document.getElementById('po-date').valueAsDate = new Date();

    function addItem() {
        const tbody = document.getElementById('items-body');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="item-desc" placeholder="Item description"></td>
            <td><input type="number" class="item-qty" value="1" min="1"></td>
            <td><input type="number" class="item-price" value="0.00" step="0.01"></td>
            <td style="text-align: center;"><button class="btn btn-danger" onclick="removeItem(this)">Remove</button></td>
        `;
        tbody.appendChild(tr);
    }

    function removeItem(btn) {
        btn.closest('tr').remove();
    }

    function generatePO() {
        // Output From fields
        document.getElementById('out-from-company').innerText = document.getElementById('from-company').value || 'N/A';
        document.getElementById('out-from-address1').innerText = document.getElementById('from-address1').value;
        document.getElementById('out-from-address2').innerText = document.getElementById('from-address2').value;
        document.getElementById('out-from-contact').innerText = document.getElementById('from-contact').value;
        
        // Output To fields
        document.getElementById('out-to-vendor').innerText = document.getElementById('to-vendor').value || 'N/A';
        document.getElementById('out-to-address1').innerText = document.getElementById('to-address1').value;
        document.getElementById('out-to-address2').innerText = document.getElementById('to-address2').value;
        document.getElementById('out-to-contact').innerText = document.getElementById('to-contact').value;
        
        // Output Meta
        document.getElementById('out-po-number').innerText = document.getElementById('po-number').value || 'N/A';
        
        const dateVal = document.getElementById('po-date').value;
        if(dateVal) {
            const dateObj = new Date(dateVal);
            document.getElementById('out-po-date').innerText = dateObj.toLocaleDateString();
        } else {
            document.getElementById('out-po-date').innerText = 'N/A';
        }

        // Output Items
        const outItemsBody = document.getElementById('out-items-body');
        outItemsBody.innerHTML = '';
        const itemRows = document.querySelectorAll('#items-body tr');
        
        let grandTotal = 0;

        itemRows.forEach(row => {
            const desc = row.querySelector('.item-desc').value;
            const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const total = qty * price;
            
            if (desc || qty > 0 || price > 0) {
                grandTotal += total;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${desc}</td>
                    <td style="text-align: center;">${qty}</td>
                    <td style="text-align: right;">$${price.toFixed(2)}</td>
                    <td style="text-align: right;">$${total.toFixed(2)}</td>
                `;
                outItemsBody.appendChild(tr);
            }
        });

        document.getElementById('out-grand-total').innerText = '$' + grandTotal.toFixed(2);

        // Switch View
        document.getElementById('input-section').style.display = 'none';
        document.getElementById('po-output').classList.add('active');
        window.scrollTo(0, 0);
    }

    function editPO() {
        document.getElementById('input-section').style.display = 'block';
        document.getElementById('po-output').classList.remove('active');
        window.scrollTo(0, 0);
    }