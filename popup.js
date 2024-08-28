$(function() {
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })
    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total','limit'], function(budget) {
            console.log('Current budget:', budget); // Log the current budget object

            var newTotal = 0;
            if (budget.total) {
                newTotal = parseInt(budget.total);
                console.log('Current total from storage:', newTotal); // Log the current total from storage
            }

            var amount = $('#amount').val();
            console.log('Amount entered:', amount); // Log the amount entered by the user

            if (amount) {
                newTotal += parseInt(amount);
                console.log('New total after adding amount:', newTotal); // Log the new total after adding the amount
            }

            chrome.storage.sync.set({ 'total': newTotal }, function() {
                console.log('New total saved to storage:', newTotal); // Log the new total saved to storage
                if(amount && newTotal>=budget.limit){
                    var notif={
                        type:'basic',
                        iconUrl:'icon48.png',
                        title:"Limit Reached",
                        message:"Uh oh! Limit Reached"
                    };
                    chrome.notifications.create('limitnotif',notif);
                }
                // Update the UI after setting the value in storage
                $('#total').text(newTotal);
                $('#amount').val('');
                console.log('UI updated with new total'); // Log that the UI has been updated
            });
        });
    });
});
